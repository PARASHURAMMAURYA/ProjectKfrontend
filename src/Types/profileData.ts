export type ProfileData = {
    travel_reason: TravelReason;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    current_address: string;
    home_address: string;
    home_address_image_url: string;
    home_city: string;
    home_country: string;
    current_city: string;
    current_country: string;
    home_latitude: number;
    home_longitude: number;
    current_latitude: number;
    current_longitude: number;
    is_current_address_public: boolean;
    profile_picture: string;
    User_Profile_Kind_Of_Traveler: UserProfileKindOfTraveler[];
    user: User;
  };
  
  export interface UserProfileKindOfTraveler {
    kind_of_traveler: TravelReason;
  }
  
  export interface TravelReason {
    id: number;
    value: string;
  }
  
  export interface User {
    id: number;
    email: string;
  }
  