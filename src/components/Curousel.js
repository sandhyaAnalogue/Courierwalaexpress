import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Animated,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 40; // image size
const ITEM_SPACING = 20; // gap between images

const images = [
  {
    id: "1",
    title: "Slide 1",
    img: "https://media.istockphoto.com/id/1415551661/photo/receiving-a-delivery-from-the-mailman-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=ytYhiEqktioryio5T657t2ncDN8bkjZRqvxfaURDcig=",
  },
  {
    id: "2",
    title: "Slide 2",
    img: "https://media.istockphoto.com/id/1369503096/photo/unsatisfied-customer-returning-order-to-delivery-boy-at-home-concept-of-hassel-free-product.webp?a=1&b=1&s=612x612&w=0&k=20&c=9Gxg0IzOR4Bf4__7iAXRKfFtguiMtzz8WMOfnxZgLxM=",
  },
  {
    id: "3",
    title: "Slide 3",
    img: "https://media.istockphoto.com/id/2204300725/photo/portrait-of-delivery-person-wearing-uniform-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_-JLb-6RxQWdwFIldNkhXPS8hB4-0Z_XbO6eFjfFAQ=",
  },
];

const Curousel = ({ styleImg, styleContainer }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentInd, setCurrentInd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextInd = (currentInd + 1) % images.length;
      setCurrentInd(nextInd);

      flatListRef.current?.scrollToIndex({
        index: nextInd,
        animated: true,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentInd]);
  return (
    <View style={[styles.container, styleContainer]}>
      <Animated.FlatList
        data={images}
        ref={flatListRef}
        keyExtractor={(item, ind) => ind.toString()}
        horizontal
        pagingEnabled={false}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING / 2 }}
        showsHorizontalScrollIndicator={true}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: item.img }}
              style={[styles.image, styleImg]}
            />
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {images.map((_, index) => {
          const inputRange = [
            (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
            index * (ITEM_WIDTH + ITEM_SPACING),
            (index + 1) * (ITEM_WIDTH + ITEM_SPACING),
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8], // middle dot bigger
            extrapolate: "clamp",
          });

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3], // fade effect
            extrapolate: "clamp",
          });

          return (
            <Pressable
              key={index}
              onPress={() => {
                setCurrentInd(index);
                flatListRef.current?.scrollToIndex({
                  index,
                  animated: true,
                });
              }}
            >
              <Animated.View
                key={index}
                style={[styles.dot, { width: dotWidth, opacity: dotOpacity }]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Curousel;

const styles = StyleSheet.create({
  container: {},
  image: {
    width: width - 40,
    borderRadius: 5,
    height: 200,
    resizeMode: "cover",
  },
  imgContainer: {
    width: ITEM_WIDTH,
    marginRight: ITEM_SPACING,
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: -15,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
    marginHorizontal: 4,
  },
});

// import {
//   FlatList,
//   StyleSheet,
//   View,
//   Dimensions,
//   Image,
//   Animated,
//   Pressable,
// } from "react-native";
// import React, { useEffect, useRef, useState } from "react";

// const { width } = Dimensions.get("window");

// const images = [
//   {
//     id: "1",
//     title: "Slide 1",
//     img: "https://media.istockphoto.com/id/1415551661/photo/receiving-a-delivery-from-the-mailman-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=ytYhiEqktioryio5T657t2ncDN8bkjZRqvxfaURDcig=",
//   },
//   {
//     id: "2",
//     title: "Slide 2",
//     img: "https://media.istockphoto.com/id/1369503096/photo/unsatisfied-customer-returning-order-to-delivery-boy-at-home-concept-of-hassel-free-product.webp?a=1&b=1&s=612x612&w=0&k=20&c=9Gxg0IzOR4Bf4__7iAXRKfFtguiMtzz8WMOfnxZgLxM=",
//   },
//   {
//     id: "3",
//     title: "Slide 3",
//     img: "https://media.istockphoto.com/id/2204300725/photo/portrait-of-delivery-person-wearing-uniform-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_-JLb-6RxQWdwFIldNkhXPS8hB4-0Z_XbO6eFjfFAQ=",
//   },
// ];

// const Curousel = ({ styleImg, styleContainer }) => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef(null);
//   const [currentInd, setCurrentInd] = useState(0);

//   // Auto scroll effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       let nextInd = (currentInd + 1) % images.length;
//       setCurrentInd(nextInd);

//       flatListRef.current?.scrollToIndex({
//         index: nextInd,
//         animated: true,
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [currentInd]);

//   return (
//     <View style={[styles.container, styleContainer]}>
//       <Animated.FlatList
//         data={images}
//         ref={flatListRef}
//         keyExtractor={(item) => item.id}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         snapToAlignment="center"
//         decelerationRate="fast"
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: false }
//         )}
//         renderItem={({ item }) => (
//           <View style={styles.imgContainer}>
//             <Image
//               source={{ uri: item.img }}
//               style={[styles.image, styleImg]}
//             />

//           </View>
//         )}

//          getItemLayout=
//             {(_, index) => ({
//               length: width - 40, // item width
//               offset: (width - 40) * index,
//               index,
//             })}
//         onScrollToIndexFailed={(info) => {
//           console.warn("Scroll failed, retrying...", info);
//           setTimeout(() => {
//             flatListRef.current?.scrollToIndex({
//               index: info.index,
//               animated: true,
//             });
//           }, 500);
//         }}
//       />

//       {/* Dots */}
//       <View style={styles.dotsContainer}>
//         {images.map((_, index) => {
//           const inputRange = [
//             (index - 1) * width,
//             index * width,
//             (index + 1) * width,
//           ];

//           const dotWidth = scrollX.interpolate({
//             inputRange,
//             outputRange: [8, 16, 8],
//             extrapolate: "clamp",
//           });

//           const dotOpacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.3, 1, 0.3],
//             extrapolate: "clamp",
//           });

//           return (
//             <Pressable
//               key={index}
//               onPress={() => {
//                 setCurrentInd(index);
//                 flatListRef.current?.scrollToIndex({
//                   index,
//                   animated: true,
//                 });
//               }}
//             >
//               <Animated.View
//                 style={[styles.dot, { width: dotWidth, opacity: dotOpacity }]}
//               />
//             </Pressable>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// export default Curousel;

// const styles = StyleSheet.create({
//   container: {
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
//   image: {
//     width: width - 40,
//     borderRadius: 5,
//     height: 200,
//     resizeMode: "cover",
//   },
//   imgContainer: {
//     width: width - 40,
//   },
//   dotsContainer: {
//     flexDirection: "row",
//     position: "absolute",
//     bottom: -15,
//   },
//   dot: {
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#333",
//     marginHorizontal: 4,
//   },
// });

// import React, { useEffect, useRef, useState } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   View,
//   Dimensions,
//   Image,
//   Animated,
//   Pressable,
//   Platform,
// } from "react-native";

// const { width } = Dimensions.get("window");

// const images = [
//   {
//     id: "1",
//     title: "Slide 1",
//     img: "https://media.istockphoto.com/id/1415551661/photo/receiving-a-delivery-from-the-mailman-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=ytYhiEqktioryio5T657t2ncDN8bkjZRqvxfaURDcig=",
//   },
//   {
//     id: "2",
//     title: "Slide 2",
//     img: "https://media.istockphoto.com/id/1369503096/photo/unsatisfied-customer-returning-order-to-delivery-boy-at-home-concept-of-hassel-free-product.webp?a=1&b=1&s=612x612&w=0&k=20&c=9Gxg0IzOR4Bf4__7iAXRKfFtguiMtzz8WMOfnxZgLxM=",
//   },
//   {
//     id: "3",
//     title: "Slide 3",
//     img: "https://media.istockphoto.com/id/2204300725/photo/portrait-of-delivery-person-wearing-uniform-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_-JLb-6RxQWdwFIldNkhXPS8hB4-0Z_XbO6eFjfFAQ=",
//   },
// ];

// const Carousel = ({ styleImg, styleContainer }) => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const flatListRef = useRef(null);
//   const [currentInd, setCurrentInd] = useState(0);

//   // ✅ Fixed auto scroll for web + native
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentInd((prevInd) => {
//         const nextInd = (prevInd + 1) % images.length;
//         flatListRef.current?.scrollToIndex({
//           index: nextInd,
//           animated: true,
//         });
//         return nextInd;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View style={[styles.container, styleContainer]}>
//       <Animated.FlatList
//         data={images}
//         ref={flatListRef}
//         keyExtractor={(item) => item.id}
//         horizontal
//         pagingEnabled
//         // contentContainerStyle={{ paddingHorizontal: 10 }}
//         showsHorizontalScrollIndicator={false}
//         snapToAlignment="center"
//         decelerationRate="fast"
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: false }
//         )}
//         renderItem={({ item }) => (
//           <View style={styles.imgContainer}>
//             <Image
//               source={{ uri: item.img }}
//               style={[styles.image, styleImg]}
//             />
//           </View>
//         )}
//         getItemLayout={(_, index) => ({
//           length: width - 40,
//           offset: (width - 40) * index,
//           index,
//         })}
//         onScrollToIndexFailed={(info) => {
//           console.warn("Scroll failed, retrying...", info);
//           setTimeout(() => {
//             flatListRef.current?.scrollToIndex({
//               index: info.index,
//               animated: true,
//             });
//           }, 500);
//         }}
//       />

//       {/* ✅ Dots */}
//       <View style={styles.dotsContainer}>
//         {images.map((_, index) => {
//           const inputRange = [
//             (index - 1) * width,
//             index * width,
//             (index + 1) * width,
//           ];

//           const dotWidth = scrollX.interpolate({
//             inputRange,
//             outputRange: [8, 16, 8],
//             extrapolate: "clamp",
//           });

//           const dotOpacity = scrollX.interpolate({
//             inputRange,
//             outputRange: [0.3, 1, 0.3],
//             extrapolate: "clamp",
//           });

//           return (
//             <Pressable
//               key={index}
//               onPress={() => {
//                 setCurrentInd(index);
//                 flatListRef.current?.scrollToIndex({
//                   index,
//                   animated: true,
//                 });
//               }}
//             >
//               <Animated.View
//                 style={[styles.dot, { width: dotWidth, opacity: dotOpacity }]}
//               />
//             </Pressable>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// export default Carousel;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center",

//     // borderWidth:1,
//   },
//   image: {
//     // width: width - 40,
//     width: width,
//     borderRadius: 8,
//     height: 200,
//     resizeMode: "cover",
//     ...Platform.select({
//       web: {
//         boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", // ✅ web shadow
//       },
//       default: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.5,
//         elevation: 5,
//       },
//     }),
//   },
//   imgContainer: {
//     // width: width - 40,
//     width: width,

//   },
//   dotsContainer: {
//     width:"100%",
//     flexDirection: "row",
//     position: "absolute",
//     bottom: -15,
//     // borderWidth:1,
//     marginLeft:20,
//   },
//   dot: {
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#333",
//     marginHorizontal: 4,
//   },
// });
