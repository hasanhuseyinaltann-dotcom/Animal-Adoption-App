import { TURKISH_CITIES } from "../data/turkishCities";

function CitySelect({ value, onChange, name = "city", required = true, className = "input-field" }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
    >
      <option value="" disabled>
        Şehir seçin
      </option>
      {TURKISH_CITIES.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}

export default CitySelect;
