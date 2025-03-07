import { SkillAbbreviation } from "@actor/creature/data.ts";
import { AttributeString } from "@actor/types.ts";
import { ABCSystemData, ABCSystemSource } from "@item/abc/data.ts";
import { BaseItemSourcePF2e, ItemTraits } from "@item/data/base.ts";

type BackgroundSource = BaseItemSourcePF2e<"background", BackgroundSystemSource>;

interface BackgroundSystemSource extends ABCSystemSource {
    traits: ItemTraits;
    boosts: Record<number, { value: AttributeString[]; selected: AttributeString | null }>;
    trainedLore: string;
    trainedSkills: {
        value: SkillAbbreviation[];
    };
    level?: never;
}

interface BackgroundSystemData extends Omit<BackgroundSystemSource, "items">, Omit<ABCSystemData, "level" | "traits"> {}

export { BackgroundSource, BackgroundSystemData };
