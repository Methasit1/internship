// 1. Abstraction 
export abstract class User {
  protected id: string;
  constructor(id: string) { this.id = id; }
  public getId(): string { return this.id; }

  abstract getRoleName(): string;
  abstract canWriteReview(): boolean;
  abstract canEditReview(ownerId: string): boolean;
}

// Inheritance เชื่อมจาก class User
export class Guest extends User {
  constructor(id: string = 'guest') { super(id); }

  getRoleName(): string { return "Guest"; }
  canWriteReview(): boolean { return false; }
  canEditReview(_ownerId: string): boolean { return false; }
}

// Inheritance เชื่อมจาก class User
export class Reviewer extends User {
  private email: string;
  constructor(id: string, email: string) {
    super(id); // ส่ง id ให้แม่เก็บ
    if (!email.toLowerCase().endsWith("@up.ac.th")) throw new Error("Invalid Email");
    this.email = email;
  }
  public getEmail(): string { return this.email; }

  getRoleName(): string { return "Reviewer"; }
  canWriteReview(): boolean { return true; }
  canEditReview(ownerId: string): boolean { return this.id === ownerId; }
}

// 3. Encapsulation
export class Company {
  private id: string;
  private name: string;
  private address: string;
  private roles: string[];
  private internCount: number;
  private imageUrl: string;

  private rating: number = 0;
  private reviewCount: number = 0;

  constructor(id: string, name: string, address: string, roles: string[], internCount: number, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.roles = roles;
    this.internCount = internCount;
    this.imageUrl = imageUrl;
  }

  public setStats(rating: number, reviewCount: number): void {
    this.rating = Math.min(5, Math.max(0, rating));
    this.reviewCount = Math.max(0, Math.floor(reviewCount));
  }

  public getCompanyInfo() {
    return {
      id: this.id, 
      name: this.name, 
      address: this.address,
      roles: this.roles, 
      internCount: this.internCount,
      imageUrl: this.imageUrl, 
      rating: this.rating,
      reviewCount: this.reviewCount
    };
  }
}

// interface class ทั่วไป
export class CompanyManager {
  private companies: Company[] = [];
  public getAllCompanies(): Company[] { return this.companies; }

  public loadMockData(mockData: any[]): void {
    for (const data of mockData) {
      this.companies.push(new Company(data.id, data.name, data.address, data.roles, data.count, data.imageUrl));
    }
  }
  public findById(id: string) {
    return this.companies
      .find(c => c.getCompanyInfo().id === String(id))
      ?.getCompanyInfo();
  }

  public search(keyword: string): Company[] {
    const k = keyword.trim().toLowerCase();
    if (!k) return this.companies;
    return this.companies.filter(c => {
      const i = c.getCompanyInfo();
      return i.name.toLowerCase().includes(k)
          || i.address.toLowerCase().includes(k)
          || i.roles.some(r => r.toLowerCase().includes(k));
    });
  }
}

// เพิ่ม Interface สำหรับข้อมูลนิสิต
// export interface StudentProfile {
//   id: string;
//   studentId: string;
//   name: string;
//   linkedIn_Profile: string;
//   facebook: string;
//   email_uni: string;
//   email_personal: string;
//   password: string;
//   reviews: Review[];
// }

// โครงสร้างของข้อมูลรีวิวแบบรวม (Unified Review Interface)
export interface Review {
  id: string;
  userId?: string;
  companyId?: string;      // ID ของบริษัท
  companyName: string;
  position?: string;       // ตำแหน่งที่ฝึกงาน
  rating: number;
  detail: string;
  content?: string;
  date: string;
  authorName?: string;     // ชื่อผู้รีวิว
  author?: string;
  isNew?: boolean;         // ป้ายกำกับรีวิวใหม่
}