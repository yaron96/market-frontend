import { Tree } from "antd";
import { useCategoryTree } from "entities/product-category/hooks/useCategoryTree";

interface Props {
  category: string[] | undefined;
  setCategory: (v: string[]) => void;
}

export const CategoryFilter: React.FC<Props> = ({ category, setCategory }) => {
  const { data, expandedKeys, onExpand } = useCategoryTree();

  if (!data) {
    return null;
  }

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
      checkedKeys={category}
      fieldNames={{ key: "_id" }}
    />
  );
};
