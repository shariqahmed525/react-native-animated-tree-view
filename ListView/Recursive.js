import React, { useState } from "react";
import {
  View,
  ScrollView,
  UIManager,
  LayoutAnimation,
  StyleSheet
} from "react-native";
import ListItems from "./ListItems";
import PropTypes from "prop-types";

export default Apps = props => {
  const [selectedOptions, setSelectedOptions] = useState({});

  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

  const selectAccountFunc = (selectedOptions, option) => {
    if (option.items) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedOptions({ ...selectedOptions });
    } else {
      props.onClick && props.onClick(option);
    }
  };

  const {
    listContainerStyle,
    data,
    containerStyle,
    rightImage,
    rightImageStyle,
    rightImageWrapperStyle,
    leftImageStyle,
    leftImage,
    listItemStyle,
    textStyle
  } = props;

  let checkType = data ? (data instanceof Array ? data : []) : [];
  return (
    <ScrollView contentContainerStyle={containerStyle || styles.containerStyle}>
      <OptionsList
        listContainerStyle={listContainerStyle || styles.listContainerStyle}
        rightImage={rightImage}
        rightImageStyle={rightImageStyle}
        rightImageWrapperStyle={rightImageWrapperStyle}
        leftImageStyle={leftImageStyle}
        leftImage={leftImage}
        listItemStyle={listItemStyle || styles.listItemStyle}
        textStyle={textStyle}
        options={checkType}
        onChange={selectAccountFunc}
        selectedOptions={selectedOptions}
      />
    </ScrollView>
  );
};

// Recursive component
const OptionsList = ({
  options,
  selectedOptions,
  onChange,
  listContainerStyle,
  rightImage,
  rightImageStyle,
  rightImageWrapperStyle,
  leftImageStyle,
  leftImage,
  listItemStyle,
  textStyle
}) => {
  const handleParentClicked = option => {
    if (selectedOptions[option.value]) {
      delete selectedOptions[option.value];
    } else {
      selectedOptions[option.value] = {};
    }
    onChange(selectedOptions, option);
  };

  const handleSubOptionsListChange = (subSelections, option) => {
    selectedOptions[option.value] = subSelections;
    onChange(selectedOptions, option);
  };

  return (
    <View>
      {options.map((option, k) => (
        <View key={k} style={{ ...listContainerStyle }}>
          <List
            index={k}
            selected={selectedOptions[option.value]}
            label={option.name}
            items={option.items}
            rightImage={rightImage}
            rightImageStyle={rightImageStyle}
            rightImageWrapperStyle={rightImageWrapperStyle}
            leftImageStyle={leftImageStyle}
            leftImage={leftImage}
            listItemStyle={listItemStyle}
            textStyle={textStyle}
            onChange={() => {
              handleParentClicked(option);
            }}
          />
          {/* Base Case */}

          {option.items &&
            option.items.length > 0 &&
            selectedOptions[option.value] && (
              <View
                style={{
                  marginStart: 15
                }}
              >
                <OptionsList
                  options={option.items}
                  selectedOptions={selectedOptions[option.value]}
                  onChange={(subSelections, opt) => {
                    handleSubOptionsListChange(subSelections, opt);
                  }}
                  rightImage={rightImage}
                  rightImageStyle={rightImageStyle}
                  rightImageWrapperStyle={rightImageWrapperStyle}
                  leftImageStyle={leftImageStyle}
                  leftImage={leftImage}
                  listItemStyle={listItemStyle}
                  textStyle={textStyle}
                  listContainerStyle={{
                    ...listContainerStyle
                  }}
                />
              </View>
            )}
        </View>
      ))}
    </View>
  );
};

// Dumb List component, completly controlled by parent
const List = ({
  selected,
  label,
  onChange,
  items,
  value,
  listContainerStyle,
  rightImage,
  rightImageStyle,
  rightImageWrapperStyle,
  leftImageStyle,
  leftImage,
  listItemStyle,
  textStyle
}) => {
  return (
    <View style={listContainerStyle}>
      <ListItems
        leftImage={
          leftImage || {
            uri: "https://image.flaticon.com/icons/png/512/55/55089.png"
          }
        }
        onPress={() => onChange(!selected, label, value, items)}
        text={label}
        rightImageStyle={rightImageStyle}
        rightImageWrapperStyle={rightImageWrapperStyle}
        leftImageStyle={leftImageStyle}
        listItemStyle={{ ...listItemStyle }}
        textStyle={textStyle}
        rightImage={
          items &&
          (rightImage || {
            uri: "http://www.pngmart.com/files/3/Down-Arrow-PNG-HD.png"
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  listItemStyle: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center"
  },
  listContainerStyle: {
    borderTopColor: "gray",
    borderTopWidth: 1,
    flex: 1
  }
});

Apps.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired
};
