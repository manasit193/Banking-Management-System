export const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  export const validatePhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone);
  };
  
  export const validatePAN = (pan: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
      pan.toUpperCase()
    );
  };
  
  export const validatePassword = (
    password: string
  ) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
      password
    );
  };
  
  export const validateName = (name: string) => {
    return name.trim().length >= 3;
  };
  
  export const validateAddress = (
    address: string
  ) => {
    return address.trim().length >= 10;
  };
  
  export const validateAge = (dob: string) => {
    const birth = new Date(dob);
  
    const today = new Date();
  
    let age =
      today.getFullYear() - birth.getFullYear();
  
    const month =
      today.getMonth() - birth.getMonth();
  
    if (
      month < 0 ||
      (month === 0 &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }
  
    return age >= 18;
  };