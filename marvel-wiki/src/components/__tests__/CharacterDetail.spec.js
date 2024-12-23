import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import CharacterDetail from "@/views/CharacterDetail.vue";
import { getCharacterById } from "@/services/marvelApi";
import ImageHero from "@/components/CharacterDetail/ImageHero.vue";

vi.mock("@/services/marvelApi", () => ({
  getCharacterById: vi.fn().mockResolvedValue({
    data: {
      data: {
        results: [
          {
            id: 1,
            name: "Homi de Ferro",
            description: "gênio, bilionário, playboy e filantropo.",
            thumbnail: { path: "path/to/ironman", extension: "jpg" },
            comics: { items: [{ name: "Homi de Ferro #1" }] },
            series: { items: [{ name: "Homi de Ferro" }] },
          },
        ],
      },
    },
  }),
}));

describe("CharacterDetail", () => {
  it("Tem que mostrar a imagem e o nome corretamente", async () => {
    const wrapper = mount(CharacterDetail);

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Iron Man");

    // Verifica se a URL da imagem está correta
    const imgElement = wrapper.findComponent(ImageHero);
    expect(imgElement.props().image).toBe("path/to/ironman.jpg");
  });
});
