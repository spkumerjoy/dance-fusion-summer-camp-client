import { useQuery } from "@tanstack/react-query";

const useMySelectedClasses = () => {
    const {
        data: selectedClasses = [],
        isLoading: loading,
        refetch,
    } = useQuery({
        queryKey: ["selectedClasses"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/selected-classes");
            return res.json();
        },
    });
    return [selectedClasses, loading, refetch];
};

export default useMySelectedClasses;
