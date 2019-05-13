from PIL import Image, ImageDraw

image = Image.open("1.jpg")
width, height = image.size

n = 5

count = int(n // 2)
new_image = Image.new("RGB", (width + count * 2, height + count * 2), (0, 0, 0))
draw = ImageDraw.Draw(new_image)
pixel = new_image.load()
area = (count, count, width + count, height + count)
new_image.paste(image, area)
matrix = [[1] * n] * n

for i in range(count + 1, width + count + 1):
    for j in range(count + 1, height + count + 1):
        r, g, b = 0, 0, 0
        for k in range(n):
            for x in range(n):
                r += pixel[i + k - (count + 1), j + x - (count + 1)][0] * matrix[k][x]
                g += pixel[i + k - (count + 1), j + x - (count + 1)][1] * matrix[k][x]
                b += pixel[i + k - (count + 1), j + x - (count + 1)][2] * matrix[k][x]
        draw.point((i - count, j - count), (int(r / n ** 2), int(g / n ** 2), int(b / n ** 2)))

new_image.save("2.jpg")