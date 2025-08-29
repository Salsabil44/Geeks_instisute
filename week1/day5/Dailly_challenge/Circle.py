import math
class Circle:
    def __init__(self, radius=None, diameter=None):
        self.radius = radius if radius is not None else diameter / 2 if diameter is not None else 1
        self.diameter = diameter if diameter is not None else self.radius * 2

    def area(self):
        return math.pi* (self.radius ** 2)

    def __str__(self):
        return f"Circle(radius={self.radius}, diameter={self.diameter})"

    def __add__(self, other_circle):
        if isinstance(other_circle, Circle):
            return Circle(radius=self.radius + other_circle.radius)
        raise TypeError("Can only add Circle instances")

    def __lt__(self, other_circle):
        if isinstance(other_circle, Circle):
            return self.area() < other_circle.area()
        raise TypeError("Can only compare Circle instances")

    def __eq__(self, other_circle):
        if isinstance(other_circle, Circle):
            return self.area() == other_circle.area()
        raise TypeError("Can only compare Circle instances")

    def in_list(self):
        circles_list = []
        for i in range(1, 11):
            circles_list.append(Circle(radius=i))
        return sorted(circles_list, key=lambda c: c.area())
    
    