import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useLocation, useNavigation } from "react-router-dom";

export const MainTabset: React.FC = () => {
  const client = useQueryClient();

  const location = useLocation();

  const mutation = useMutation({
    mutationKey: ["addTab"],
    mutationFn: async (newTab: Location) => {
      client.setQueryData(["tabs"], (oldTabs: Location[]) => [
        ...(oldTabs || []),
        newTab,
      ]);
    },
  });

  const tabs = client.getQueryData<Location[]>(["tabs"]);

  useEffect(() => {
    mutation.mutate(location as any);
  }, [location]);

  return (
    <div>
      <ul style={{ display: "flex" }}>
        {tabs?.map((tab, index) => (
          <li key={index}>
            <Link to={tab.pathname}>{tab.pathname}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
