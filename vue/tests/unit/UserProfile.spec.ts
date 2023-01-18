import { mount } from "@vue/test-utils";
import UserProfile from "../../src/components/UserProfile.vue";
import { useAuth0 } from "@auth0/auth0-vue";

jest.mock("@auth0/auth0-vue", () => ({
  useAuth0: jest.fn(),
}));

function mockIt(obj: object) {
  (useAuth0 as jest.Mock).mockImplementation(() => obj);
}

describe("Render profile", () => {
  it("displays loading", () => {
    mockIt({ user: null, isLoading: true });
    const wrapper = mount(UserProfile);
    expect(wrapper.html()).toContain("Loading ...");
  });

  it("is blank when no user", () => {
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
