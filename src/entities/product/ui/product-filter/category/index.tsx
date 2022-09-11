import { Tree } from "antd";
import { useCategoryTree } from "entities/product-category/hooks/useCategoryTree";

interface Props {
  setCategory: (v: string[]) => void;
}

export const CategoryFilter: React.FC<Props> = ({ setCategory }) => {
  const { data, expandedKeys, onExpand } = useCategoryTree();

  return (
    <Tree
      checkable
      selectable={false}
      onCheck={(e) => {
        if (Array.isArray(e)) {
          setCategory(e.map((key) => key.toString()));
        }
      }}
      onExpand={onExpand}
      treeData={data}
      expandedKeys={expandedKeys}
      fieldNames={{ key: "_id" }}
    />
  );
};
