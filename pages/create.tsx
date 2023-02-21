import React from "react";
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Input,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { CodeEditor } from "../components/CodeEditor";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconAd, IconPlus, IconTrash } from "@tabler/icons";
import { useRouter } from "next/router";

export const languages = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "py" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "cs" },
  { label: "C", value: "c" },
  { label: "Ruby", value: "rb" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rs" },
  { label: "Kotlin", value: "kt" },
  { label: "Swift", value: "swift" },
  { label: "PHP", value: "php" },
  { label: "Scala", value: "scala" },
  { label: "Dart", value: "dart" },
  { label: "Elixir", value: "elixir" },
  { label: "Haskell", value: "haskell" },
  { label: "Lua", value: "lua" },
  { label: "Objective-C", value: "objective-c" },
  { label: "Perl", value: "perl" },
  { label: "R", value: "r" },
  { label: "SQL", value: "sql" },
  { label: "Shell", value: "shell" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "Markdown", value: "markdown" },
  { label: "Text", value: "text" },
];

export const Create = () => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      codeBlocks: [{ language: "", code: "", key: randomId() }],
    },
    validate: {
      title: (value) =>
        value.length < 2 ? "Title must have at least 2 letters" : null,
      description: (value) =>
        value.length < 2 ? "Description must have at least 2 letters" : null,
      codeBlocks: {
        code: (value) =>
          value.length < 2 ? "Code must have at least 2 letters" : null,
      },
    },
    validateInputOnChange: true,
  });
  const router = useRouter();

  const handleSubmit = () => {
    console.log("form.values", form.values);
    if (!form.isValid()) {
      return;
    }

    const codeData = form.values.codeBlocks.map((item) => ({
      language: item.language,
      // remove the </code></pre> tags from the code
      code: item.code.replace(/<pre><code>/g, ""),
    }));

    const db = getFirestore(app);
    const blogRef = collection(db, "blogs");
    addDoc(blogRef, {
      title: form.values.title,
      description: form.values.description,
      codeBlocks: codeData,
    }).then((docRef) => {
      console.log("docRef", docRef);
      form.reset();
      router.push("/");
      console.log("Document written with ID: ", docRef.id);
    });
  };

  const fields = form.values.codeBlocks.map((item, index) => (
    <Flex key={item.key} mt="xs" direction="column" gap="xs">
      <Select
        placeholder="Language"
        withAsterisk
        sx={{ flex: 1 }}
        {...form.getInputProps(`codeBlocks.${index}.language`)}
        data={languages}
        searchable
      />
      {form.values.codeBlocks?.[index]?.language && (
        <CodeEditor
          code={item.code}
          onChange={(value) =>
            form.setFieldValue(`codeBlocks.${index}.code`, value)
          }
        />
      )}
      <Flex gap="md" mb="lg">
        {form.values.codeBlocks.length > 1 && (
          <ActionIcon
            color="red"
            onClick={() => form.removeListItem("codeBlocks", index)}
          >
            <IconTrash size={28} />
          </ActionIcon>
        )}

        {index === form.values.codeBlocks.length - 1 && (
          <ActionIcon
            color="green"
            onClick={() =>
              form.insertListItem("codeBlocks", {
                language: "",
                code: "",
                key: randomId(),
              })
            }
          >
            <IconPlus size={28} />
          </ActionIcon>
        )}
      </Flex>
    </Flex>
  ));

  return (
    <Container size="sm" my="xl">
      <Text color="primary" fw={600} mb="lg">
        Add Blog
      </Text>
      <form>
        <Input.Wrapper label="Title" mb="lg">
          <Input
            type="text"
            name="title"
            id="title"
            {...form.getInputProps("title")}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Description" mb="lg">
          <Textarea
            name="description"
            id="description"
            {...form.getInputProps("description")}
            autosize
            minRows={6}
            maxRows={12}
          />
        </Input.Wrapper>

        <Input.Wrapper label="Code">{fields}</Input.Wrapper>
        <Button mt="lg" onClick={handleSubmit} color="dark">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Create;
