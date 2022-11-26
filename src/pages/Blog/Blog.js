import React from "react";
import BlogCard from "./BlogCard";

const Blog = () => {
  return (
    <div className="container mx-auto px-6 lg:px-3 my-12">
      <BlogCard
        title={
          "What are the different ways to manage a state in a React application?"
        }
        text={
          "There are four main types of state you need to properly manage in your React apps:1.Local state 2.Global state 3.Server state 3.URL state. Let's cover each of these in detail: Local (UI) state – Local state is data we manage in one or another component. Global (UI) state – Global state is data we manage across multiple components. Server state – Data that comes from an external server that must be integrated with our UI state. URL state – Data that exists on our URLs, including the pathname and query parameters."
        }
      />
      <BlogCard
        title={"How does prototypical inheritance work?"}
        text={
          "The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object."
        }
      />
      <BlogCard
        title={"What is a unit test? Why should we write unit tests?"}
        text={
          "The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages."
        }
      />
      <BlogCard
        title={"React vs. Angular vs. Vue?"}
        text={
          "Angular: In Angular, components are referred to as directives. Directives are just markers on DOM elements, which Angular can track and attach specific behavior too. Therefore, Angular separates the UI part of components as attributes of HTML tags, and their behaviors in the form of JavaScript code. This is what sets it apart when looking at Angular vs React. React: React, interestingly, combines the UI and behavior of components. For instance, here is the code to create a hello world component in React. In React, the same part of the code is responsible for creating a UI element and dictating its behavior. When looking into Vue vs React, in Vue, UI and behavior are also a part of components, which makes things more intuitive. Also, Vue is highly customizable, which allows you to combine the UI and behavior of components from within a script. Further, you can also use pre-processors in Vue rather than CSS, which is a great functionality. Vue is great when it comes to integration with other libraries, like Bootstrap."
        }
      />
    </div>
  );
};

export default Blog;
