// 1. Abstraction[cite: 1]
export abstract class User {
  protected id: string; // Encapsulation
  constructor(id: string) { this.id = id; }
  abstract getRoleName(): string;
  abstract canWriteReview(): boolean; 
}

// 2. Inheritance & Polymorphism[cite: 1]
export class Guest extends User {
  constructor(id: string) { super(id); }
  getRoleName(): string { return "Guest"; }
  canWriteReview(): boolean { return false; }
}

export class Reviewer extends User {
  private email: string;
  constructor(id: string, email: string) {
    super(id);
    if (!email.endsWith("@up.ac.th")) throw new Error("Invalid Email");
    this.email = email;
  }
  getRoleName(): string { return "Reviewer"; }
  canWriteReview(): boolean { return true; }
}

// 3. Encapsulation (ซ่อนแอตทริบิวต์บริษัท)[cite: 1]
export class Company {
  private id: string;
  private name: string;
  private address: string;
  private roles: string[];
  private internCount: number;
  private imageUrl: string;
  private rating: number = (Math.random() * 1 + 4); 

  constructor(id: string, name: string, address: string, roles: string[], internCount: number, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.roles = roles;
    this.internCount = internCount;
    this.imageUrl = imageUrl;
  }

  public getCompanyInfo() {
    return {
      id: this.id, name: this.name, address: this.address, 
      roles: this.roles, internCount: this.internCount, 
      imageUrl: this.imageUrl, rating: this.rating
    };
  }
}

export class CompanyManager {
  private companies: Company[] = [];

  public loadMockData(mockData: any[]): void {
    for (const data of mockData) {
      this.companies.push(new Company(data.id, data.name, data.address, data.roles, data.count, data.imageUrl));
    }
  }
  public getAllCompanies(): Company[] { return this.companies; }
}

// เพิ่ม Interface สำหรับข้อมูลนิสิต
export interface StudentProfile {
  id: string;
  studentId: string;
  name: string;
  linkedIn_Profile: string;
  facebook: string;
  email_uni: string;
  email_personal: string;
  password: string;
  reviews: Review[];
}

// โครงสร้างของข้อมูลรีวิว 1 รายการ
export interface Review {
  id: string;
  companyId: string;
  companyName: string;
  rating: number;
  content: string;
  date: string;
}

// myreview
export interface Review {
    id: string;
    companyName: string;
    position: string;
    rating: number;       // เลขจำนวนเต็ม 1-5 (ไม่มีทศนิยม)
    detail: string;
    date: string;         // รูปแบบ "DD / MM / YYYY"
    authorName: string;   // ชื่อผู้รีวิว
    isNew?: boolean;
    author?: string;
}