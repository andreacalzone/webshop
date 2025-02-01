import React from 'react';

const categoryMap = {
    laptop: "Laptops",
    mobiltelefoner: "Mobiltelefoner",
    dammsugare: "Dammsugare",
    TV: "TV-apparater"
};

const Sidebar = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
}) => {
    const sortedCategories = categories
        .map(category => ({
            key: category,
            displayName: categoryMap[category] || category
        }))
        .sort((a, b) => a.displayName.localeCompare(b.displayName));

    return (
        <div className="w-full p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Kategorier</h3>
            <ul className="space-y-2">
                <li>
                    <button
                        className={`w-full text-left p-2 rounded-lg text-blue-800 font-semibold ${!selectedCategory
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-200'
                            }`} 
                        onClick={() => setSelectedCategory('')}>
                        Alla
                    </button>
                </li>

                {sortedCategories.map(({ key, displayName }) => (
                    <li key={key}>
                        <button
                            className={`w-full text-left p-2 rounded ${selectedCategory === key
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-200'
                                }`}
                            onClick={() => setSelectedCategory(key)}
                        >
                            {displayName}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Sortera efter</h3>
                <ul className="space-y-2">
                    <li>
                        <button
                            className={`w-full text-left p-2 rounded ${sortBy === 'price-asc'
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-200'
                                }`}
                            onClick={() => setSortBy('price-asc')}
                        >
                            Lägsta pris
                        </button>
                    </li>
                    <li>
                        <button
                            className={`w-full text-left p-2 rounded ${sortBy === 'price-desc'
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-200'
                                }`}
                            onClick={() => setSortBy('price-desc')}
                        >
                            Högsta pris
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;