import { Dispatch, SetStateAction, useMemo } from "react";
import { SelectWrapper, InputWrapper } from "./ui";
import { Select } from "antd";
import { rulesData } from "../../db";
import "./RuleItem.css";
import { Group, Rule } from "../types";

type RuleComponent = {
  rule: Rule;
  ruleType: string;
  setRuleType: Dispatch<SetStateAction<string>>;
  operatorOptions: Array<string>;
  operator: string;
  setOperator: Dispatch<SetStateAction<string>>;
  value: [] | { min: number; max: number } | string;
  setValue: any;
  groups: Array<Group>;
};

const RuleItem = (props: RuleComponent) => {
  const {
    rule,
    ruleType,
    setRuleType,
    operatorOptions,
    operator,
    setOperator,
    value,
    setValue,
    groups,
  } = props;

  // handle input actions
  const handleInputs = (val: string, type: string, min?: boolean) => {
    if (type === "multi_select") {
      setValue([...val]);
    } else if (type === "numeric_range") {
      if (min) {
        setValue({ ...value, min: val });
      } else {
        setValue({ ...value, max: val });
      }
    } else {
      setValue(val);
    }
  };

  // render third element for each rule type
  const renderValueInput = useMemo(() => {
    switch (rule.value_type) {
      case "multi_select":
        return (
          <SelectWrapper
            placeholder="Select values"
            key={"multi_select"}
            value={value}
            onChange={(e: string) => handleInputs(e, "multi_select")}
            mode="multiple"
          >
            {rule?.multi_select_options?.map((item) => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </SelectWrapper>
        );
      case "boolean":
        return (
          <SelectWrapper
            value={value}
            onChange={(e: string) => handleInputs(e, "boolean")}
          >
            <Select.Option value="yes">Yes</Select.Option>
            <Select.Option value="no">No</Select.Option>
          </SelectWrapper>
        );
      case "numeric_range":
        return (
          <div className="range_input">
            <InputWrapper
              placeholder="Min Range"
              type="number"
              value={value.min}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputs(e.target.value, "numeric_range", true)
              }
            />
            <InputWrapper
              placeholder="Max Range"
              type="number"
              value={value.max}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputs(e.target.value, "numeric_range", false)
              }
            />
          </div>
        );
      default:
        return (
          <InputWrapper
            placeholder="Value"
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputs(e.target.value, "text")
            }
          />
        );
    }
  }, [rule]);

  // disable rule once selected
  const disableSelectedRule = (id: string) => {
    return groups.some((item) => item.rule.id === id);
  };

  return (
    <div className="ruleitem">
      {/* rule type selector */}
      <SelectWrapper
        key={"rule"}
        value={ruleType}
        onChange={(e: string) => setRuleType(e)}
      >
        <Select.Option value={""} disabled>
          Select a Rule
        </Select.Option>
        {rulesData.map((item) => (
          <Select.Option
            value={item.id}
            disabled={disableSelectedRule(item.id)}
          >
            {item.name}
          </Select.Option>
        ))}
      </SelectWrapper>
      {/* operator type selector, hide when no operators available */}
      {operatorOptions.length > 0 && (
        <SelectWrapper
          key={"operator"}
          value={operator}
          onChange={(e: string) => setOperator(e)}
        >
          <Select.Option value={""} disabled>
            Select an Operator
          </Select.Option>
          {operatorOptions?.map((item) => (
            <Select.Option value={item}>{item}</Select.Option>
          ))}
        </SelectWrapper>
      )}

      {renderValueInput}
    </div>
  );
};

export default RuleItem;
