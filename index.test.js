import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let document;
let window;

describe("HTML Document", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    window = dom.window;
  });

  test("Title should exist and contain the word 'article'", () => {
    const title = document.querySelector("title");
    expect(title).toBeDefined();
    expect(title.textContent).toMatch(/article/i);
  });

  test("Title should exist only once", () => {
    const titles = document.querySelectorAll("title");
    expect(titles.length).toBe(1);
  });

  test("Should have div elements with specific classes inside 'container-article'", () => {
    const containerArticle = document.querySelector(".container-article");
    expect(containerArticle).toBeDefined();

    const articleTitle = containerArticle.querySelector(".article-title");
    expect(articleTitle).toBeDefined();

    const articleDescription = containerArticle.querySelector(".article-description");
    expect(articleDescription).toBeDefined();

    const articleImgContainer = containerArticle.querySelector(".article-img-container");
    expect(articleImgContainer).toBeDefined();

    const articleContent = containerArticle.querySelector(".article-content");
    expect(articleContent).toBeDefined();
  });

  test("Article title should be 'airport'", () => {
    const articleTitle = document.querySelector(".article-title>h1");
    expect(articleTitle.textContent).toMatch(/airport/i);
  });

  test("There should be content inside the article-description", () => {
    const articleDescription = document.querySelector(".article-description h3");
    expect(articleDescription.textContent.trim()).not.toBe("");
  });
  

  test("There should be content inside the article-content", () => {
    const articleContent = document.querySelector(".article-content p");
    expect(articleContent.textContent.trim()).not.toBe("");
  });

  test("The img element should have a 'src' attribute inside the article-img-container", () => {
    const articleImgContainer = document.querySelector(".article-img-container");
    const imgElement = articleImgContainer.querySelector("img");
    expect(imgElement).toBeDefined();
    expect(imgElement.getAttribute("src")).toBeTruthy();
  });
  
  
  
});
