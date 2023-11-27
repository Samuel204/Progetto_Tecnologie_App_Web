export interface RoleInformation {
  id: string;
  name: string;

}

export interface UserInformation {
  _id: String;
  username: String;
  email: String;
  password: String;
  isAdmin: Boolean;
  roles: RoleInformation[];
}
