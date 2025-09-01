import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        if items is None:
            items = []
        self.items = items
        self.page_size = page_size
        self.current_idx = 0
        self.total_pages = math.ceil(len(self.items) / self.page_size) if self.page_size > 0 else 0

    def get_visible_items(self):
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    def go_to_page(self, page_num):
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError("Page number out of range")
        self.current_idx = page_num - 1
        return self

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        if self.total_pages > 0:
            self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def __str__(self):
        return "\n".join(self.get_visible_items())


alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

#test
print(p.get_visible_items())
p.next_page()
print(p.get_visible_items())
p.last_page()
print(p.get_visible_items())
p.go_to_page(10)
print(p.current_idx + 1)
p.go_to_page(0)