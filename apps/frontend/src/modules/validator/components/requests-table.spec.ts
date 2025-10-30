import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import RequestsTable from "./requests-table.vue";
import AppProviders from "@/components/app-providers.vue";
import { RequestStatus } from "common";

const makeItem = (overrides: Partial<any> = {}) => ({
  id: 1,
  user_id: 1,
  start_date: "2025-01-01",
  end_date: "2025-01-02",
  reason: null,
  status: RequestStatus.APPROVED,
  comments: null,
  created_at: "2025-01-01",
  ...overrides,
});

function mountWithProviders(items: any[]) {
  return mount(AppProviders, {
    slots: {
      default: () => h(RequestsTable, { items }),
    },
    global: {
      stubs: {
        // keep tests lightweight
        "n-data-table": true,
        "n-button": true,
      },
    },
  });
}

describe("RequestsTable", () => {
  it("hides actions for non-pending rows", () => {
    const wrapper = mountWithProviders([makeItem()]);
    expect(wrapper.text()).not.toContain("approve");
    expect(wrapper.text()).not.toContain("reject");
  });

  it("shows actions for pending rows", () => {
    const wrapper = mountWithProviders([
      makeItem({ status: RequestStatus.PENDING }),
    ]);
    expect(wrapper.text()).toContain("approve");
    expect(wrapper.text()).toContain("reject");
  });
});
