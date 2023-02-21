import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { CopyBlock, dracula } from "react-code-blocks";
import { useRouter } from "next/router";
import { languages } from "../create";

const inter = Inter({ subsets: ["latin"] });

export const CodeBlocks = () => {
  const router = useRouter();
  const { blog } = router.query;

  // @ts-ignore
  const data = blog ? JSON.parse(blog) : {};
  console.log("data", data);

  return (
    <>
      {data && (
        <main className={styles.main}>
          <h2>{data.title}</h2>
          <div className={styles.description}>
            <p>{data.description}</p>
          </div>
          {data?.codeBlocks?.map((codeBlock: any) => (
            <div key={codeBlock.language}>
              <p>
                {languages.find((l) => l.value === codeBlock.language)?.label}
              </p>
              <CopyBlock
                text={codeBlock.code}
                language={codeBlock.language}
                showLineNumbers="true"
                wrapLines
                theme={dracula}
              />
            </div>
          ))}
        </main>
      )}
    </>
  );
};

export default CodeBlocks;
