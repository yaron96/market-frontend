import { useState } from "react";
import { useQuery } from "react-query";
import { productCategoryApi } from "shared/api/product-category";
import { productCategoryKeys } from "entities/product-category/query-keys";
import { Key } from "antd/lib/table/interface";

export const useCategoryTree = () => {
    const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

    const initialData = {}
    const { data, isLoading, isError } = useQuery(
        productCategoryKeys.tree,
        () => productCategoryApi.getTree(),
        {
            initialData: initialData,
            onSuccess: initExpandedKeys,
        }
    );

    function onExpand(_: any, item: any) {
        const nodeKey = item?.node?.key;
        if(item.nativeEvent.type !== "dragenter") {
            if (item.node.expanded) {
                setExpandedKeys((arr) => arr.filter((e) => e !== nodeKey));
            } else {
                setExpandedKeys((arr) => [...arr, nodeKey]);
            }
        }
    }

    function initExpandedKeys(data: any) {
        const allKeys = getAllKeys(data);
        setExpandedKeys((arr: any) => {
            if (arr.length) return arr;
            else return allKeys;
        });
    }

    return {
        data: data ? data.children : initialData,
        isError,
        isLoading,
        expandedKeys,
        onExpand,
    };
};

const getAllKeys = (node: any) => {
    const result = [];
    result.push(node._id);

    if (node.children.length) {
        const childKeys = node.children.map((child: any) => getAllKeys(child));
        childKeys.map((el: any) => {
            result.push(...el);
        });
    }

    return result;
};