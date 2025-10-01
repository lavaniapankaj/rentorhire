// utils/saveLocation.js
export default async function saveUserLocation() {
  try {
    /** Check if already saved */
    const existing = localStorage.getItem("user_location");
    if (existing) {
      //console.log("Location already exists in localStorage:", JSON.parse(existing));
      return;
    }

    /** Otherwise fetch new location */
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return;

    const data = await res.json();

    const loc = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      postal: data.postal,
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: Date.now(),
    };

    localStorage.setItem("user_location", JSON.stringify(loc));
    console.log("Location saved:", loc);
  } catch (err) {
    console.error("Location fetch failed:", err);
  }
}
