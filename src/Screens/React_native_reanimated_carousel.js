import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	Extrapolation,
	interpolate,
	useSharedValue,
} from "react-native-reanimated";
import Carousel, {
	ICarouselInstance,
	Pagination,
} from "react-native-reanimated-carousel";
import { windowWidth } from "../utils/util";

const defaultDataWith6Colors = [
	"#B0604D",
	"#899F9C",
	"#B3C680",
	"#5C6265",
	"#F5D399",
	"#F1F1F1",
];

const PAGE_WIDTH = windowWidth-50;

const renderItem = ({ item }) => (
	<View style={[styles.itemContainer, { backgroundColor: item }]}> 
		<Text style={styles.itemText}>{item}</Text>
	</View>
);

function React_native_reanimated_carousel() {
	const progress = useSharedValue(0);
	const ref = React.useRef(null);

	const onPressPagination = (index) => {
		ref.current?.scrollTo({
			count: index - progress.value,
			animated: true,
		});
	};

	return (
		<View style={{ gap: 10, alignItems: "center" }}>
			<View style={{ marginBottom: 10 }}>
				<Carousel
					ref={ref}
					width={PAGE_WIDTH}
					height={PAGE_WIDTH * 0.6}
					loop
					onProgressChange={progress}
					data={defaultDataWith6Colors}
					renderItem={renderItem}
				/>
			</View>

			<Pagination.Basic
				progress={progress}
				data={defaultDataWith6Colors}
				dotStyle={{ backgroundColor: "#262626" }}
				activeDotStyle={{ backgroundColor: "#f1f1f1" }}
				containerStyle={{ gap: 5, marginBottom: 10 }}
				onPress={onPressPagination}
			/>

			<Pagination.Custom
				progress={progress}
				data={defaultDataWith6Colors.map((color) => ({ color }))}
				size={10}
				dotStyle={{ borderRadius: 16, backgroundColor: "#262626" }}
				activeDotStyle={{ borderRadius: 8, width: 40, height: 10, backgroundColor: "#f1f1f1" }}
				containerStyle={{ gap: 5, alignItems: "center", height: 40 }}
				horizontal
				onPress={onPressPagination}
				customReanimatedStyle={(progress, index, length) => {
					let val = Math.abs(progress - index);
					if (index === 0 && progress > length - 1) {
						val = Math.abs(progress - length);
					}

					return {
						transform: [
							{
								translateY: interpolate(
									val,
									[0, 1],
									[0, 0],
									Extrapolation.CLAMP
								),
							},
						],
					};
				}}
				renderItem={(item) => (
					<View style={{ backgroundColor: item.color, flex: 1 }} />
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		width: PAGE_WIDTH,
		height: PAGE_WIDTH * 0.6,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	itemText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
});

export default React_native_reanimated_carousel;
