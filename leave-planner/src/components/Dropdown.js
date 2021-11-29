import { useState } from "react";
import './Dropdown.css'
function Dropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["Sick", "Casual", "Annual","Maternity/Paternity","Personal"];

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                   expand_more
                </span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option, idx) => (
            <div key={idx}
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
