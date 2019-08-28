# react-native-animated-tree-view

A React Native animated tree view component

![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square)
[![github release](https://img.shields.io/github/v/release/shariqahmed1/react-native-animated-tree-view.svg?style=flat-square)](https://www.github.com/shariqahmed1/react-native-animated-tree-view/releases)

## Table of contents

1. [Show](#show)
1. [Usage](#usage)
1. [Props](#props)

## Show

![react-native-animated-tree-view](https://media.giphy.com/media/kgZdimnRjNLVdbXhUI/giphy.gif)

## Installation

```
yarn add react-native-animated-tree-view
```

## Usage

Firstly, you have to define your data. Example:

```javascript
const data = [
  {
    name: "Cheese",
    value: "cheese-value"
  },
  {
    name: "Cheese",
    value: "cheese-value",
    items: [
      {
        name: "Spicy",
        value: "spicy-value"
      },
      {
        name: "Cheese",
        value: "cheese-value",
        items: [
          {
            name: "Spicy",
            value: "spicy-value"
          },
          {
            name: "Spicy",
            value: "spicy-value"
          }
        ]
      }
    ]
  }
];
```

It is required that each node on the tree have its own value key which name should be "value". The tree nodes are defined in the items key. They are an array of objects, following the same structure as the parent.

After defining data, mount the component. Example:

```javascript
import TreeView from "react-native-animated-tree-view";

export default App = () => {
  return <TreeView data={data} />;
};
```

## Props

### ListView

| Prop                 | Description                                                                                      | Type     | Default      |
| -------------------- | ------------------------------------------------------------------------------------------------ | -------- | ------------ |
| **data**             | Array of nested items                                                                            | Array    | **Required** |
| **onClick**          | Return clicked item                                                                              | Function | Not Require  |
| **displayNodeName**  | Takes a node to render a display text                                                            | String   | name         |
| **childrenNodeName** | Node to determine in a node where are the children, by default it will try to find them in items | String   | items        |
| **leftImage**        | Left side image                                                                                  |          | Not Require  |
| **rightImage**       | Right side image                                                                                 |          | Not Require  |

### Style Props

| Prop                       | Description                    | Type   |
| -------------------------- | ------------------------------ | ------ |
| **containerStyle**         | Container Style                | Object |
| **listContainerStyle**     | List Container Style           | Object |
| **listItemStyle**          | List Item Style                | Object |
| **textStyle**              | List Item Text Style           | Object |
| **leftImageStyle**         | Left side image style          | Object |
| **rightImageWrapperStyle** | Right side image wrapper style | Object |
| **rightImageStyle**        | Right side image style         | Object |
