export const users: any = [
  {
    id: 1,
    type: 1,
    role: "Manager",
    phone: "01994688976",
    name: "Admin",
    password: "123456",
    email: "admin@admin.com",
    location: "Mirpur-10",
    image:'https://reqres.in/img/faces/1-image.jpg',
    from: "01-01-2022",
    to: "01-01-2023",
  },
  {
    id: 2,
    type: 5,
    role: "Manager",
    name: "Nayeem",
    phone: "01994688976",
    password: "123456",
    email: "manager@admin.com",
    image:'https://reqres.in/img/faces/5-image.jpg',
    location: "Mirpur-10",
    from: "01-01-2022",
    to: "01-01-2023",
  },
  {
    id: 3,
    type: 5,
    role: "Manager",
    phone: "01994688976",
    name: "Bappy",
    image:'https://reqres.in/img/faces/3-image.jpg',

    password: "123456",
    email: "manager2@admin.com",
    location: "Mirpur-10",
    from: "01-01-2022",
    to: "01-01-2023",
  },
  {
    id: 4,
    type: 5,
    role: "Manager",
    phone: "01994688976",
    image:'https://reqres.in/img/faces/7-image.jpg',

    name: "Hr Bappy",
    password: "123456",
    email: "manager@admin.com",
    location: "Mirpur-10",
    from: "01-01-2022",
    to: "01-01-2023",
  },
];
export const roleList = [
  {
    id: 1,
    role: "SA",
    name: "Super Admin",
    type: 1,
  },
  {
    id: 2,
    role: "ORU",
    name: "Officer Reported Upon",
    type: 2,
  },
  {
    id: 3,
    role: "RIO",
    name: "Report Initialaling Officer",
    type: 3,
  },
  {
    id: 4,
    role: "CSO",
    name: "Counter Signing Officer",
    type: 4,
  },
  ,
  {
    id: 5,
    role: "MA",
    name: "Manager",
    type: 5,
  },
];

export const defaultProduct = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    price: 52000,
    description: "RAM | ROM: 4GB | 512GB, Color: Pink, Battery Health: Below 80%",
    category: "electronics",
    isTaxable: "yes",
    isActive: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    price: 45000,
    description: "RAM | ROM: 8GB | 256GB, Color: Phantom Black, AMOLED Display",
    category: "electronics",
    isTaxable: "yes",
    isActive: true,
  },
  {
    id: 3,
    name: "Diamond Necklace",
    price: 150000,
    description: "18K Gold Chain with real diamonds, Weight: 25g",
    category: "jewellery",
    isTaxable: "yes",
    isActive: true,
  },
  {
    id: 4,
    name: "Gold Plated Earrings",
    price: 3000,
    description: "Traditional design, lightweight, anti-allergic finish",
    category: "jewellery",
    isTaxable: "no",
    isActive: true,
  },
  {
    id: 5,
    name: "Men's Cotton T-Shirt",
    price: 1200,
    description: "100% Cotton, Size: M, Color: Navy Blue",
    category: "clothing",
    isTaxable: "no",
    isActive: true,
  },
  {
    id: 6,
    name: "Women's Denim Jacket",
    price: 2200,
    description: "Denim Wash, Size: L, Color: Light Blue",
    category: "clothing",
    isTaxable: "yes",
    isActive: false,
  },
];



export const sortList = [
    {
      id: 0,
      name: "--select price--",
      value: 0,
    },
    {
      id: 1,
      name: "price low to high",
      value: 1,
    },
    {
      name: "price high to low",
      id: 2,
      value: 2,
    },
  ];
 
  export const categoryOption = [
    {
      id: 0,
      name: "--select category--",
      value: '',
    },
    {
      id: 1,
      name: "Electronics",
      value: 'electronics',
    },
    {
      id: 2,
      name: "Clothing",
      value: 'clothing',
    },
    {
      name: "Jewellery",
      id: 3,
      value: 'jewellery',
    },
  ]
