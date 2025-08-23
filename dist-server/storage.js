// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  contactSubmissions;
  newsletterSubscriptions;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.newsletterSubscriptions = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createContactSubmission(insertSubmission) {
    const id = randomUUID();
    const submission = {
      ...insertSubmission,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      company: insertSubmission.company ?? null
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  async getContactSubmissions() {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  async createNewsletterSubscription(insertSubscription) {
    const id = randomUUID();
    const subscription = {
      ...insertSubscription,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }
  async getNewsletterSubscriptions() {
    return Array.from(this.newsletterSubscriptions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var storage = new MemStorage();
export {
  MemStorage,
  storage
};
