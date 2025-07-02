const formatDate = (isoString) => {
  const date = new Date(isoString);
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',    // e.g., "Jan"
    day: 'numeric',    // e.g., "15"
    year: 'numeric',   // e.g., "2023"
    hour: '2-digit',   // e.g., "03"
    minute: '2-digit', // e.g., "45"
    hour12: true       // AM/PM format
  }).format(date);
  
  // Example output: "Jan 15, 2023, 03:45 PM"
};


function getLocalStorageSize() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    total += key.length + value.length;
  }
  return total; // Size in bytes
}


export  {formatDate, getLocalStorageSize};

//const dateInIso = new Date().toISOString();
//console.log(dateInIso);
//console.log(formatDate(dateInIso));