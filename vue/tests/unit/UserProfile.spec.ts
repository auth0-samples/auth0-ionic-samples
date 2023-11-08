import { mount } from "@vue/test-utils";
import { describe, expect, Mock, test, vi } from "vitest";

import UserProfile from "../../src/components/UserProfile.vue";
import { useAuth0 } from "@auth0/auth0-vue";

vi.mock("@auth0/auth0-vue", () => ({
  useAuth0: vi.fn(),
}));

function mockIt(obj: object) {
  (useAuth0 as Mock).mockImplementation(() => obj);
}

describe("Render profile", () => {
  test("displays loading", () => {
    mockIt({ user: null, isLoading: true });
    const wrapper = mount(UserProfile);
    expect(wrapper.html()).toContain("Loading ...");
  });

  test("is blank when no user", () => {
    mockIt({ user: null, isLoading: false });
    const wrapper = mount(UserProfile);
    expect(wrapper.html()).toContain("<div></div>");
  });

  test("displays name when user exists", () => {
    const user = {
      name: "John Doe",
      email: "johndoe@me.com",
    };
    mockIt({ user, isLoading: false });
    const wrapper = mount(UserProfile);
    expect(wrapper.html()).toContain(user.name);
  });
});
