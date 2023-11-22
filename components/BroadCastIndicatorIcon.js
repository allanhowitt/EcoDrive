import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base'
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

const _color = '#39BF68';
const _size = 100;

const BroadCastIndicatorIcon = ({ onPress }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map((index) => {
          return (<MotiView
            from={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{
              type: 'timing',
              duration: 2000,
              delay: index * 400,
              loop: true,
              repeatReverse: false,
              easing: Easing.out(Easing.ease),
            }}
            key={index}
            style={[StyleSheet.absoluteFillObject, styles.dot]}
          />);
        })}
        <Icon
          name='broadcast-tower'
          type='font-awesome-5'
          color='#FFFFFF'
          size={32}
          onPress={onPress}
        />
      </View>
    </View>
  )
}

export default BroadCastIndicatorIcon

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _color
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})