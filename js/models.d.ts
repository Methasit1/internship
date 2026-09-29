export declare abstract class User {
    protected id: string;
    constructor(id: string);
    getId(): string;
    abstract getRoleName(): string;
    abstract canWriteReview(): boolean;
    abstract canEditReview(ownerId: string): boolean;
}
export declare class Guest extends User {
    constructor(id?: string);
    getRoleName(): string;
    canWriteReview(): boolean;
    canEditReview(_ownerId: string): boolean;
}
export declare class Reviewer extends User {
    private email;
    constructor(id: string, email: string);
    getEmail(): string;
    getRoleName(): string;
    canWriteReview(): boolean;
    canEditReview(ownerId: string): boolean;
}
export declare class Company {
    private id;
    private name;
    private address;
    private roles;
    private internCount;
    private imageUrl;
    private rating;
    private reviewCount;
    constructor(id: string, name: string, address: string, roles: string[], internCount: number, imageUrl: string);
    setStats(rating: number, reviewCount: number): void;
    getCompanyInfo(): {
        id: string;
        name: string;
        address: string;
        roles: string[];
        internCount: number;
        imageUrl: string;
        rating: number;
        reviewCount: number;
    };
}
export declare class CompanyManager {
    private companies;
    getAllCompanies(): Company[];
    loadMockData(mockData: any[]): void;
    findById(id: string): {
        id: string;
        name: string;
        address: string;
        roles: string[];
        internCount: number;
        imageUrl: string;
        rating: number;
        reviewCount: number;
    } | undefined;
    search(keyword: string): Company[];
}
export interface Review {
    id: string;
    userId?: string;
    companyId?: string;
    companyName: string;
    position?: string;
    rating: number;
    detail: string;
    content?: string;
    date: string;
    authorName?: string;
    author?: string;
    isNew?: boolean;
}
//# sourceMappingURL=models.d.ts.map