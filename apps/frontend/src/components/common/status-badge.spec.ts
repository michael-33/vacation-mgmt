import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import StatusBadge from "./status-badge.vue";
import { RequestStatus } from "common";

describe("StatusBadge", () => {
  it("renders APPROVED label with styles", () => {
    const wrapper = mount(StatusBadge, {
      props: { status: RequestStatus.APPROVED },
    });
    expect(wrapper.text().toLowerCase()).toContain("approved");
  });

  it("renders PENDING label by default style", () => {
    const wrapper = mount(StatusBadge, {
      props: { status: RequestStatus.PENDING as any },
    });
    expect(wrapper.text().toLowerCase()).toContain("pending");
  });
});
