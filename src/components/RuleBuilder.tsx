import { useState } from "react";
import RuleGroup from "./RuleGroup";
import { rulesData } from "../../db";
import { ButtonWrapper } from "./ui";
import { Group, Rule } from "../types";
import { Divider } from "antd";

const RuleBuilder = () => {
  const [groups, setGroups] = useState<Array<Group>>([
    {
      id: 1,
      rule: {
        ...rulesData[0],
        value: [],
        operator: "",
      },
      priority: rulesData[0].priority,
    },
  ]);

  // add new rule group
  const handleAddGroup = () => {
    setGroups([
      ...groups,
      {
        id: groups.length + 1,
        rule: { ...rulesData[groups.length], value: [], operator: "" },
        priority: rulesData[groups.length].priority,
      },
    ]);
  };

  // update existing rule group
  const handleUpdateRule = (groupId: number, newRule: Rule) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              rule: newRule,
              priority: newRule.priority,
            }
          : group
      )
    );
  };

  // remove rule
  const handleRemoveRule = (groupId: number) => {
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );
  };

  console.log(groups);

  return (
    <>
      <div className="p-6 border rounded-lg shadow-lg bg-white">
        <label>Show offer if</label>
        {groups
          .sort((a: Group, b: Group) => (a.priority >= b.priority ? 1 : -1))
          .map((group: Group, index) => (
            <>
              <RuleGroup
                key={"group" + group.id + index}
                rule={group.rule}
                groupid={group.id}
                onRemove={handleRemoveRule}
                groups={groups}
                updateRule={handleUpdateRule}
              />
              {index < groups.length - 1 && (
                <Divider plain orientation="left">
                  AND
                </Divider>
              )}
            </>
          ))}
      </div>
      <ButtonWrapper
        onClick={handleAddGroup}
        disabled={groups.length === rulesData.length}
        className="mt-4"
      >
        {groups.length > 0 ? "+ And" : "Add New Rule"}
      </ButtonWrapper>
    </>
  );
};

export default RuleBuilder;
