import { useQuery } from "@tanstack/react-query";

const useMySelectedClasses = () => {
    const {
        data: selectedClasses = [],
        isLoading: loading,
        refetch,
    } = useQuery({
        queryKey: ["selectedClasses"],
        queryFn: async () => {
            const res = await fetch(
                "https://dance-fusion-summer-camp-server.vercel.app/selected-classes"
            );
            return res.json();
        },
    });
    return [selectedClasses, loading, refetch];
};

export default useMySelectedClasses;
