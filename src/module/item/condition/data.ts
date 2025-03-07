import { AbstractEffectSystemData, AbstractEffectSystemSource } from "@item/abstract-effect/data.ts";
import { BaseItemSourcePF2e } from "@item/data/base.ts";
import { DamageType } from "@system/damage/index.ts";
import { DamageRoll } from "@system/damage/roll.ts";
import { ConditionSlug } from "./types.ts";

type ConditionSource = BaseItemSourcePF2e<"condition", ConditionSystemSource>;

interface ConditionSystemSource extends AbstractEffectSystemSource {
    slug: ConditionSlug;
    references: {
        parent?: {
            id: string;
            type: string;
        };
        children: { id: string; type: "condition" }[];
        overriddenBy: { id: string; type: "condition" }[];
        overrides: { id: string; type: "condition" }[];
    };
    duration: { value: number };
    persistent?: PersistentSourceData;
    group: string | null;
    value: ConditionValueData;
    overrides: string[];
    context?: never;
    level?: never;
    traits?: never;
}

interface PersistentSourceData {
    formula: string;
    damageType: DamageType;
    dc: number;
}

interface ConditionSystemData
    extends Omit<ConditionSystemSource, "fromSpell">,
        Omit<AbstractEffectSystemData, "level" | "slug" | "traits"> {
    persistent?: PersistentDamageData;
}

interface PersistentDamageData extends PersistentSourceData {
    damage: DamageRoll;
    expectedValue: number;
}

type ConditionValueData = { isValued: true; value: number } | { isValued: false; value: null };

export { ConditionSource, ConditionSystemData, ConditionSystemSource, PersistentDamageData, PersistentSourceData };
