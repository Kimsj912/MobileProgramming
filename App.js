import * as Location from "expo-location";
import React, {useEffect,useState} from "react";
import { ActivityIndicator, View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
// Constants
const API_KEY = "0c64d2a74e1235da0dd38d8e7f441b69";
const WEEK_DAY = ["일","월","화","수","목","금","토"];

// func
export const getWeatherDay = (data) => {
    const currentTime = new Date(
       data * 1000 - 9 * 60 * 60 * 1000
    );
    const getMonth = currentTime.getMonth();
    const getDate = currentTime.getDate();
    const getWeek = currentTime.getDay();
    return `${getMonth}월 ${getDate}일 (${WEEK_DAY[getWeek]})`;
};

export const getWeatherTime = (data) => {
    const currentTime = new Date(
       data * 1000 - 9 * 60 * 60 * 1000
    );
    const getHour = currentTime.getHours();
    const getMinute = currentTime.getMinutes();
    const getSec = currentTime.getSeconds();
    return `${getHour}시 ${getMinute}분 ${getSec}초`;
};

export default function App() {
  // hooks
    const [days, setDays] = useState([]);
    const [region, setRegion] = useState("...");
    const [city, setCity] = useState("Loading");
    const [district, setDistrict] = useState("...");

    useEffect(() => {
    (async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
        return;
        }
      //경도 위도 정보가져오기
        const { coords: { latitude, longitude }, } = await Location.getCurrentPositionAsync({ accuracy: 5 });
        const location = await Location.reverseGeocodeAsync(
            { latitude, longitude},
            { useGoogleMaps: false}
        );
        setCity(location[0].city);
        setRegion(location[0].region);
        setDistrict(location[0].district);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric&lang=kr`
        );
        const json = await response.json();
        setDays(json.daily);
    })();
    }, []);

    return (
    <View style={styles.container}>
        <View style={styles.city}>
            <Text style={styles.notation}>지금 당신이 있는</Text>
            <Text style={styles.cityName}>{region} {city} {district}</Text>
        </View>
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.weather}
        >
        {/* 0이면 로딩표시 (ActivityIndicator 동작) */}
        {days.length === 0 ? (
            <View style={styles.day}>
                <ActivityIndicator
                color="white"
                style={{ marginTop: 10 }}
                size="large"
                />
            </View>
        ) : (
            days.map((day, index) => (
                <View key={index} style={styles.day}>
                    <Text style={styles.boldbig}>{getWeatherDay(day.dt)} </Text>
                    <Text style={styles.description}>{day.weather[0].description} <Text style={styles.tinyText}>( {day.weather[0].main} )</Text></Text>
                    <Text style={styles.boldbig}>현재 기온 : {parseFloat(day.temp.day).toFixed(1)}°C</Text>

                    <View style={styles.detail}>
                      <Text style={styles.description}>최저기온 : {day.temp.min}°C </Text>
                      <Text style={styles.description}>최고기온 : {day.temp.max}°C </Text>
                      <Text style={styles.description}>일출 : {getWeatherTime(day.sunrise)} </Text>
                      <Text style={styles.description}>일몰 : {getWeatherTime(day.sunset)}</Text>
                    </View>
                </View>
            ))
            )}
        </ScrollView>
    </View>
    );
}
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgreen",
    },
    notation: {
        fontSize: 20,
        fontWeight: "400",
    },
    city: {
        flex: 1.2,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    cityName: {
        fontSize: 30,
        fontWeight: "500",
    },
    boldbig: {
      marginTop: 20,
      fontSize: 40,
      fontWeight: "600",
      textAlign: "center",
    },
    day: {
      width: SCREEN_WIDTH,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    detail:{
      margin: 15,
    },
    description: {
      fontSize: 30,
    },
});
