import { useEffect, useState } from "react";
import RuleItem from "./RuleItem";
import { rulesData } from "../../db";
import { DeleteOutlined } from "@ant-design/icons";
import { Rule, Group } from "../types";

// component prop types
type GroupComponent = {
  rule: Rule;
  onRemove: (groupId: number) => void;
  updateRule: any;
  groupid: number;
  groups: Array<Group>;
};

const RuleGroup = ({
  rule,
  onRemove,
  updateRule,
  groupid,
  groups,
}: GroupComponent) => {
  const [ruleType, setRuleType] = useState(rule.id);
  const [operatorOptions, setOperatorOptions] = useState(rule?.operators);
  const [value, setValue] = useState<
    [] | string | { min: number; max: number }
  >(rule.value);
  const [operator, setOperator] = useState(rule.operator);

  // set operators when rule type is selected
  useEffect(() => {
    if (ruleType !== rule.id) {
      let rule = rulesData.find((item) => item.id === ruleType);
      if (rule) {
        setOperatorOptions(rule?.operators);
        updateRule(groupid, rule);
      }
    }
  }, [ruleType]);

  // set operator and selection values for selected rule type
  useEffect(() => {
    if (ruleType === rule.id) {
      let rule = rulesData.find((item) => item.id === ruleType);

      let obj = { ...rule, value: value, operator: operator };
      updateRule(groupid, obj);
    }
  }, [value, operator]);

  return (
    <div className="rulewrapper">
      <RuleItem
        key={groupid + "rules"}
        rule={rule}
        ruleType={ruleType}
        setRuleType={setRuleType}
        operatorOptions={operatorOptions}
        operator={operator}
        value={value}
        groups={groups}
        setValue={setValue}
        setOperator={setOperator}
      />

      <DeleteOutlined onClick={() => onRemove(groupid)} />
    </div>
  );
};

export default RuleGroup;
