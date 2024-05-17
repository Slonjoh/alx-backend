# Popular Baby Names

This project provides functionality to work with popular baby names data from a CSV file. It allows querying names based on various criteria.

## Data

The data is sourced from `Popular_Baby_Names.csv` which includes columns for Year, Gender, Ethnicity, Child's First Name, Count, and Rank.

## Installation

No installation required. Simply place the `Popular_Baby_Names.csv` file in the same directory as the Python script.

## Usage
Run ./main.py(files)
### Example
bob@dylan:~$ ./0-main.py
<class 'tuple'>
(0, 7)
<class 'tuple'>
(30, 45)
### Practical Example
```python
from popular_baby_names import get_top_names_by_year

top_names = get_top_names_by_year(2016, 'FEMALE', 'ASIAN AND PACIFIC ISLANDER', 3)
print(top_names)  # Output: ['Olivia', 'Chloe', 'Sophia']
