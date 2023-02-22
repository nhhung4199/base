import Images from 'assets/images';
import {Themes} from 'assets/themes';
import React, {useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
const width = Dimensions.get('screen').width;

const EventHome = () => {
  const [data, setData] = useState([
    {images: [Images.slide_1]},
    {images: [Images.slide_1]},
    {images: [Images.slide_1]},
  ]);
  const ref = useRef<any>();
  const [activeSlide, setActiveSlide] = useState(0);
  const _renderItem = ({item}, parallaxProps) => {
    return (
      <View>
        <ParallaxImage
          source={item?.images?.[0]}
          containerStyle={styles.imageContainer}
          parallaxFactor={0}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        data={data}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width - scale(32)}
        onSnapToItem={index => setActiveSlide(index)}
        autoplay={true}
        itemHeight={width - scale(32)}
        hasParallaxImages={true}
      />
      <View>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          dotStyle={styles.dot}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
          containerStyle={styles.containerStyleDot}
          inactiveDotStyle={{backgroundColor: Themes.Light.COLORS.black}}
        />
      </View>
    </View>
  );
};

export default EventHome;

const styles = ScaledSheet.create({
  container: {
    marginTop: '25@vs',
  },

  dot: {
    width: 4,
    height: 4,
    backgroundColor: Themes.Light.COLORS.white,
  },
  containerStyleDot: {
    paddingBottom: 0,
    paddingTop: 0,
    position: 'absolute',
    alignSelf: 'center',
    top: '-15@ms',
  },
  imageContainer: {
    width: width - scale(32),
    height: width - scale(32),
  },
});
