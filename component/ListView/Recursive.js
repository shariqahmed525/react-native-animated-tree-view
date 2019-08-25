import React, {useState} from 'react';
import {
  View,
  ScrollView,
  UIManager,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import ListItems from './ListItems';
import PropTypes from 'prop-types';

export default Apps = props => {
  const [selectedOptions, setSelectedOptions] = useState({});

  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

  const selectAccountFunc = (selectedOptions, option) => {
    if (option.subAccounts) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedOptions({...selectedOptions});
    } else {
      props.onClick && props.onClick(option);
    }
  };

  const {
    mainListViewStyle,
    data,
    containerStyle,
    rightImage,
    rightImageStyle,
    rightImageWrapperStyle,
    leftImageStyles,
    leftImage,
    listItemContainer,
    textStyle,
  } = props;

  let checkType = data ? (data instanceof Array ? data : []) : [];
  return (
    <ScrollView contentContainerStyle={containerStyle || styles.containerStyle}>
      <OptionsList
        mainListViewStyle={mainListViewStyle || styles.mainListViewStyle}
        rightImage={rightImage}
        rightImageStyle={rightImageStyle}
        rightImageWrapperStyle={rightImageWrapperStyle}
        leftImageStyles={leftImageStyles}
        leftImage={leftImage}
        listItemContainer={listItemContainer || styles.listItemContainer}
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
  mainListViewStyle,
  rightImage,
  rightImageStyle,
  rightImageWrapperStyle,
  leftImageStyles,
  leftImage,
  listItemContainer,
  textStyle,
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
        <View key={k} style={{...mainListViewStyle}}>
          <List
            index={k}
            selected={selectedOptions[option.value]}
            label={option.name}
            subAccounts={option.subAccounts}
            rightImage={rightImage}
            rightImageStyle={rightImageStyle}
            rightImageWrapperStyle={rightImageWrapperStyle}
            leftImageStyles={leftImageStyles}
            leftImage={leftImage}
            listItemContainer={listItemContainer}
            textStyle={textStyle}
            onChange={() => {
              handleParentClicked(option);
            }}
          />
          {/* Base Case */}

          {option.subAccounts &&
            option.subAccounts.length > 0 &&
            selectedOptions[option.value] && (
              <View
                style={{
                  marginStart: 15,
                }}>
                <OptionsList
                  options={option.subAccounts}
                  selectedOptions={selectedOptions[option.value]}
                  onChange={(subSelections, opt) => {
                    handleSubOptionsListChange(subSelections, opt);
                  }}
                  rightImage={rightImage}
                  rightImageStyle={rightImageStyle}
                  rightImageWrapperStyle={rightImageWrapperStyle}
                  leftImageStyles={leftImageStyles}
                  leftImage={leftImage}
                  listItemContainer={listItemContainer}
                  textStyle={textStyle}
                  mainListViewStyle={{
                    ...mainListViewStyle,
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
  subAccounts,
  value,
  mainListViewStyle,
  rightImage,
  rightImageStyle,
  rightImageWrapperStyle,
  leftImageStyles,
  leftImage,
  listItemContainer,
  textStyle,
}) => {
  return (
    <View style={mainListViewStyle}>
      <ListItems
        leftImage={
          leftImage || {
            uri: 'https://image.flaticon.com/icons/png/512/55/55089.png',
          }
        }
        onPress={() => onChange(!selected, label, value, subAccounts)}
        text={label}
        rightImageStyle={rightImageStyle}
        rightImageWrapperStyle={rightImageWrapperStyle}
        leftImageStyles={leftImageStyles}
        listItemContainer={{...listItemContainer}}
        textStyle={textStyle}
        rightImage={
          subAccounts &&
          (rightImage || {
            uri: 'http://www.pngmart.com/files/3/Down-Arrow-PNG-HD.png',
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  mainListViewStyle: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    flex: 1,
  },
});

Apps.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};
