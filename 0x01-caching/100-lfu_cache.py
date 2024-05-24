#!/usr/bin/env python3
""" LFUCache module """
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache class that inherits from BaseCaching and
    implements an LFU caching system """

    def __init__(self):
        """ Initialize the LFU cache """
        super().__init__()
        self.freq = {}
        self.usage = {}

    def put(self, key, item):
        """
        Assign to the dictionary self.cache_data the item value
        for the key key.
        If key or item is None, this method should not do anything.
        If the number of items in self.cache_data is higher
        than BaseCaching.MAX_ITEMS:
        discard the least frequently used item (LFU algorithm).
        If there is a tie, use the least recently used (LRU) algorithm.
        Print DISCARD: with the key discarded and following by a new line.
        """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            self.freq[key] += 1
            self.usage[key] = len(self.usage)
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                lfu_keys = [
                    k for k, v in self.freq.items()
                    if v == min(self.freq.values())
                ]
                if len(lfu_keys) > 1:
                    lru_key = min(lfu_keys, key=lambda k: self.usage[k])
                else:
                    lru_key = lfu_keys[0]
                del self.cache_data[lru_key]
                del self.freq[lru_key]
                del self.usage[lru_key]
                print("DISCARD: {}".format(lru_key))

            self.cache_data[key] = item
            self.freq[key] = 1
            self.usage[key] = len(self.usage)

    def get(self, key):
        """
        Return the value in self.cache_data linked to key.
        If key is None or if the key doesn’t exist in self.cache_data,
        return None.
        """
        if key is None or key not in self.cache_data:
            return None

        self.freq[key] += 1
        self.usage[key] = len(self.usage)
        return self.cache_data[key]
