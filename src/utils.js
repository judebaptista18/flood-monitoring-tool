  export function debounce(cb, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  export function capitalizeWords(str) {
    return str && str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  Date.prototype.formatDateTime = function() {
    const day = String(this.getDate()).padStart(2, "0"); 
    const month = String(this.getMonth() + 1).padStart(2, "0"); 
    const year = this.getFullYear();
    let hours = this.getHours();
    const minutes = String(this.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  }


  