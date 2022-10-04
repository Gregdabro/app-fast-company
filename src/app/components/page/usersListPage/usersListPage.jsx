import React, { useState } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../UI/searchStatus";
import UsersTable from "../../UI/usersTable";
import { orderBy } from "lodash";
import Loader from "../../UI/Loader/Loader";
import SearchInput from "../../common/form/searchInput";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");

    const { users } = useUser();
    const { professions } = useProfessions();

    const handleDelete = (userId) => {
        console.log("userId", userId);
        // setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };

    const pageSize = 8;

    const handleProfessionSelect = (item) => {
        searchQuery && setSearchQuery("");
        setSelectedProf(item);
        setCurrentPage(1);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleChangeValue = (e) => {
        selectedProf && setSelectedProf(null);
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users &&
        users.filter((user) => {
            if (selectedProf) {
                return user.profession === selectedProf._id;
            } else if (searchQuery) {
                return user.name.toLowerCase().includes(searchQuery.toLowerCase());
            } else {
                return users;
            }
        });
    if (users) {
        const count = filteredUsers.length;
        const sortedUsers = orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf(null);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchInput
                        searchQuery={searchQuery}
                        handleChangeValue={handleChangeValue}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <Loader/>
        </div>);
};

export default UsersListPage;
