export interface LinkApiP{
    className?:string;
    url:string;
    text:string;
}
export interface Input{
    name:string;
    label?:string;
    type:string;
    placeholder?:string;
    value?:string;
}
export interface FormApiProps{
    className?:string;
    image:string;
    title:string;
    description:string;
    inputs:Array<Input>;
    additionalInfo?:string;
    link:LinkApiP;
    submit:string;
    sendData:(data:SignUpInterface)=>void;
}
export interface LoginInterface{
    email:string;
    password:string;
}
export interface SignUpInterface extends LoginInterface{
    first_name:string;
    last_name:string;
    user_name:string;
    password_confirmation:string;
    profile_image:File | null;
}
export interface AddItem{
    name:string;
    price:number;
    image:File|null;
}
export interface Btn{
    image?:string;
    text:string;
    className?:string;
    show?:boolean;
    logOut?:()=>void;
    onClick?: () => void; 
}
export interface BtnsProps{
    btns:Array<Btn>;
}
export interface FormProductsProps{
    className?:string;
    className1?:string;
    inputs:Array<Input>;
    show?:boolean;
    sendData:(data:AddItem)=>void;
    submit?:string;
}
export interface Item{
    id:number;
    name:string;
    price:string;
    image_url:string;
    created_at:string;
    updated_at:string;
}
export interface PaginationApiProps{
    itemsNumber:number;
}
export interface ApiTitleProps{
    className?:string;
    title:string;
}
export interface CardInfoApiProps{
    className?:string;
    title:string;
    description?:string;
    show?:boolean;
}