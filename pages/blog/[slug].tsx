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
  const code = `class TrieNode:
  def __init__(self):
      self.children = {}
      self.is_word = False
      self.word = ""


class Trie:
  def __init__(self):
      self.root = TrieNode()
  
  def insert(self, word):
      curr = self.root
      for char in word:
          if char not in curr.children:
              curr.children[char] = TrieNode()
          curr = curr.children[char]
      curr.is_word = True
      curr.word = word


def findAllConcatenatedWordsInADict(words):
  trie = Trie()
  for word in words:
      trie.insert(word)
  concatenated_words = []
  for word in words:
      if dfs(trie.root, word, 0):
          concatenated_words.append(word)
  return concatenated_words


def dfs(node, word, start):
  curr = node
  for i in range(start, len(word)):
      if word[i] not in curr.children:
          return False
      curr = curr.children[word[i]]
      if curr.is_word:
          if i == len(word)-1:
              return False
          if dfs(node, word, i+1):
              return True
  return curr.is_word


words = ["cat","cats","dog","dogs","sand","and","catdog"]
print(findAllConcatenatedWordsInADict(words))
`;

  const python = `class TrieNode:
def __init__(self):
    self.children = {}
    self.is_word = False
    self.word = ""


class Trie:
def __init__(self):
    self.root = TrieNode()

def insert(self, word):
    curr = self.root
    for char in word:
        if char not in curr.children:
            curr.children[char] = TrieNode()
        curr = curr.children[char]
    curr.is_word = True
    curr.word = word


def findAllConcatenatedWordsInADict(words):
trie = Trie()
for word in words:
    trie.insert(word)
concatenated_words = []
for word in words:
    if dfs(trie.root, word, 0):
        concatenated_words.append(word)
return concatenated_words


def dfs(node, word, start):
curr = node
for i in range(start, len(word)):
    if word[i] not in curr.children:
        return False
    curr = curr.children[word[i]]
    if curr.is_word:
        if i == len(word)-1:
            return False
        if dfs(node, word, i+1):
            return True
return curr.is_word


words = ["cat","cats","dog","dogs","sand","and","catdog"]
print(findAllConcatenatedWordsInADict(words))
`;

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
          {data.codeBlocks.map((codeBlock: any) => (
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
