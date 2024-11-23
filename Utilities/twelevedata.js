class TwelveDataAPI {
    constructor(apiKey) {
      this.baseUrl = "https://api.twelvedata.com/";
      this.apiKey = apiKey;
    }
  
    async getTimeSeries(params) {
      const { symbol, interval, startDate, endDate, outputSize = 1 } = params;
      const url = `${this.baseUrl}time_series`;
  
      // Construct query parameters
      const queryParams = new URLSearchParams({
        symbol: symbol,
        interval: interval,
        start_date: startDate || "",
        end_date: endDate || "",
        outputsize: outputSize,
        apikey: this.apiKey,
      });
  
      try {
        // Fetch API call
        const response = await fetch(`${url}?${queryParams}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error("Error with Twelve Data API: " + error.message);
      }
    }
  }
  
  // Example usage
  (async () => {
    const apiKey = "YOUR_API_KEY"; // Replace with your Twelve Data API key
    const api = new TwelveDataAPI(apiKey);
  
    try {
      const data = await api.getTimeSeries({
        symbol: "AAPL",
        interval: "1d",
        outputSize: 50,
      });
  
      if (data.status === "error") {
        console.error("API error:", data.message || data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  })();
  