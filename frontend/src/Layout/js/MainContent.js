import "../css/MainContent.css";
import WeatherForm from "../../Component/Weather/WeatherForm";
import WeatherInfo from "../../Component/Weather/WeatherInfo";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../../reducer/toastSlice";
import { useState } from "react";

function MainContent() {
  // const Api_Key = "f6d6101d0021278c055f63970fe1b2f2";
  const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";

  //weatherState là dữ liệu thời tiết lấy từ api
  const [weatherState, setWeatherState] = useState({
    temperature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: "",
  });
  const dispatch = useDispatch();

  /**
   * Hàm getWeather lấy data và trả về dữ liệu thời tiết
   */
  async function getWeather(event) {
    const city = event.city;
    const country = event.country;
    // event.preventDefault();

    try {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );
      const response = await api_call.json();

      if (city && country) {
        setWeatherState({
          temperature: response.main.temp,
          city: response.name,
          country: response.sys.country,
          humidity: response.main.humidity,
          description: response.weather[0].description,
          error: "",
        });

        dispatch(
          showToastMessage({
            show: true,
            title: "Thành Công",
            message: "Thời tiết đã được cập nhật",
            variant: "success",
          })
        );
      } else {
        this.setWeatherState({
          error: "Please fill all fields...",
        });
      }
    } catch (error) {
      setWeatherState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Không tìm thấy thành phố",
      });

      dispatch(
        showToastMessage({
          show: true,
          title: "Thất Bại",
          message: "Không tìm thấy thành phố",
          variant: "warning",
        })
      );
    }
    return;
  }

  return (
    <div className="main-content">
      <WeatherForm onDataChange={getWeather}></WeatherForm>
      <WeatherInfo
        temperature={weatherState.temperature}
        city={weatherState.city}
        country={weatherState.country}
        humidity={weatherState.humidity}
        description={weatherState.description}
        error={weatherState.error}
      ></WeatherInfo>
    </div>
  );
}

export default MainContent;
