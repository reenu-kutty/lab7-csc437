import React, {useEffect} from "react";
import { Spinner } from "./Spinner.jsx";
import { groceryFetcher } from "./groceryFetcher"

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */
function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function GroceryPanel(props) {
    const [groceryData, setGroceryData] = React.useState([]);
    const [dataSource, setDataSource] = React.useState("MDN");

    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        props.addTask(todoName)
    }

    async function handleDropdownChange(changeEvent) {
        setDataSource(changeEvent.target.value);
    }

    useEffect(() => {
        let isStale = false;

        async function fetchGroceryData(url) {
            props.setIsLoading(true);
            setGroceryData([])
            props.setError(null)

            if (!url) {
                props.setIsLoading(false);
                return;
            }
            try {
                const response = await groceryFetcher.fetch(url);
                if(!isStale) {
                    setGroceryData(response);
                }
            } catch (err) {
                if(!isStale) {
                    props.setError(err.message);
                }
            } finally {
                if(!isStale) {
                    props.setIsLoading(false);
                }
            }
        }

        if(!isStale) {
            fetchGroceryData(dataSource);
        }

        return () => {
            isStale = true;
        }
    }, [dataSource]);

    return (
        <div>
            <h1 className="text-xl font-bold pt-5">Groceries prices today</h1>
            <div className="flex flex-row">
                <label className="mb-4 flex gap-4 pr-4">
                    Get prices from:
                    <select value={dataSource} onChange={handleDropdownChange} className="border border-gray-300 p-1 rounded-sm disabled:opacity-50">
                        <option value="MDN">MDN</option>
                        <option value="Liquor store">Liquor store</option>
                        <option value="Butcher">Butcher</option>
                        <option value="whoknows">Who knows?</option>
                    </select>
                </label>
                <Spinny isLoading={props.isLoading} />
                <Error error={props.error}/>
            </div>

            {
                groceryData.length > 0 ?
                    <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} /> :
                    "No data"
            }
        </div>
    );
}

function PriceTable(props) {
    return (
        <table className="mt-4">
            <thead>
            <tr>
                <th className="text-left pr-40 pb-2">Name</th>
                <th className="pr-10 pb-2">Price</th>
            </tr>
            </thead>
            <tbody>
            {
                props.items.map(item =>
                    <PriceTableRow
                        key={item.name}
                        item={item}
                        onAddClicked={() => props.onAddClicked(item)}
                    />
                )
            }
            </tbody>
        </table>
    );
}

function PriceTableRow({item, onAddClicked}) {
    const buttonClasses = `italic px-2 rounded-sm border border-gray-300
        hover:bg-gray-100 active:bg-gray-200 cursor-pointer`;
    return (
        <tr>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>
                <button className={buttonClasses} onClick={onAddClicked}>
                    Add to todos
                </button>
            </td>
        </tr>
    );
}

function Spinny(props) {
    return props.isLoading ? <Spinner/> : null;
}

function Error(props) {
    return props.error ? <div className="text-red-500">{props.error}</div>: null;
}
