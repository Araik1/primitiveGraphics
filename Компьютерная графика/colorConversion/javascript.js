window.onload = function() {

	var RGB, CMY, CMYK, HSV;

	function CMYK_To_CMY(C, M, Y, K)
	{
		C /= 100;
		M /= 100;
		Y /= 100;
		K /= 100;

		c = (C * (1 - K) + K)
		m = (M * (1 - K) + K)
		y = (Y * (1 - K) + K)

		return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100)];
	}

	function RGB_To_CMYK(R, G, B)
	{
		k = Math.min(1 - R, 1 - G, 1 - B);
		c = (1 - R - k) / (1 - k);
		m = (1 - G - k) / (1 - k);
		y = (1 - B - k) / (1 - k);

		return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
	}

	function CMY_To_RGB(C, M, Y)
	{
		C /= 100;
		M /= 100;
		Y /= 100;

		r = (1 - C) * 255;
		g = (1 - M) * 255;
		b = (1 - Y) * 255;

		return [Math.ceil(r), Math.ceil(g), Math.ceil(b)];
	}

	function RGB_To_HSV(R, G, B)
	{

		MAX = Math.max(R, G, B);
		MIN = Math.min(R, G, B);

		if(MAX === 0)
		{
			s = 0;
		}
		else
		{
			s = 1 - (MIN / MAX);
		}

		v = MAX;

		if(MAX === MIN)
		{
			h = 0;
		}
		else if(MAX === R && G >= B)
		{
			h = 60 * (G - B) / (MAX - MIN);
		}
		else if(MAX === R && G < B)
		{
			h = 60 * (G - B) / (MAX - MIN) + 360;
		}
		else if(MAX === G)
		{
			h = 60 * (B - R) / (MAX - MIN) + 120;
		}
		else if(MAX === B)
		{
			h = 60 * (R - G) / (MAX - MIN) + 240;
		}

		return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
	}

	function HSV_To_RGB(H, S, V)
	{
		Hi = Math.floor(H / 60) % 6;

		

		Vmin = (100 - S) * V / 100;

		a = (V - Vmin) * ((H % 60) / 60);

		Vinc = Vmin + a;
		Vdec = V - a;

		switch(Hi)
		{
			case 0:
				return [Math.ceil(V * 2.55), Math.ceil(Vinc * 2.55), Math.ceil(Vmin * 2.55)];
			case 1:
				return [Math.ceil(Vdec * 2.55), Math.ceil(V * 2.55), Math.ceil(Vmin * 2.55)];
			case 2:
				return [Math.ceil(Vmin * 2.55), Math.ceil(V * 2.55), Math.ceil(Vinc * 2.55)];
			case 3:
				return [Math.ceil(Vmin * 2.55), Math.ceil(Vdec * 2.55), Math.ceil(V * 2.55)];
			case 4:
				return [Math.ceil(Vinc * 2.55), Math.ceil(Vmin * 2.55), Math.ceil(V * 2.55)];
			case 5:
				return [Math.ceil(V * 2.55), Math.ceil(Vmin * 2.55), Math.ceil(Vdec * 2.55)];
		}
	}

	function strart() {
		RGB = document.getElementById('rgb');
		CMY = document.getElementById('cmy');
		CMYK = document.getElementById('cmyk');
		HSV = document.getElementById('hsv');

		if(RGB.value != "")
		{
			splitRGB = RGB.value.split(',');
			splitRGB[0] /= 255;
			splitRGB[1] /= 255;
			splitRGB[2] /= 255;


			HSV.value = RGB_To_HSV(splitRGB[0], splitRGB[1], splitRGB[2]);
			
			CMYK.value = RGB_To_CMYK(splitRGB[0], splitRGB[1], splitRGB[2]);
			
			splitCMYK = CMYK.value.split(',');
			CMY.value = CMYK_To_CMY(splitCMYK[0], splitCMYK[1], splitCMYK[2], splitCMYK[3]);

		}
		else if(CMY.value != "")
		{
			splitCMY = CMY.value.split(',');
			RGB.value = CMY_To_RGB(splitCMY[0], splitCMY[1], splitCMY[2]);

			splitRGB = RGB.value.split(',');
			splitRGB[0] /= 255;
			splitRGB[1] /= 255;
			splitRGB[2] /= 255;
			CMYK.value = RGB_To_CMYK(splitRGB[0], splitRGB[1], splitRGB[2]);

			HSV.value = RGB_To_HSV(splitRGB[0], splitRGB[1], splitRGB[2]);
		}
		else if(CMYK.value != "")
		{
			splitCMYK = CMYK.value.split(',');
			CMY.value = CMYK_To_CMY(splitCMYK[0], splitCMYK[1], splitCMYK[2], splitCMYK[3]);

			splitCMY = CMY.value.split(',');
			RGB.value = CMY_To_RGB(splitCMY[0], splitCMY[1], splitCMY[2]);

			splitRGB = RGB.value.split(',');
			splitRGB[0] /= 255;
			splitRGB[1] /= 255;
			splitRGB[2] /= 255;
			HSV.value = RGB_To_HSV(splitRGB[0], splitRGB[1], splitRGB[2]);
		}
		else if(HSV.value != "")
		{
			splitHSV = HSV.value.split(',');
			RGB.value = HSV_To_RGB(splitHSV[0], splitHSV[1], splitHSV[2]);

			splitRGB = RGB.value.split(',');
			splitRGB[0] /= 255;
			splitRGB[1] /= 255;
			splitRGB[2] /= 255;
			CMYK.value = RGB_To_CMYK(splitRGB[0], splitRGB[1], splitRGB[2]);

			splitCMYK = CMYK.value.split(',');
			CMY.value = CMYK_To_CMY(splitCMYK[0], splitCMYK[1], splitCMYK[2], splitCMYK[3]);
		}


	}

	document.getElementById('start').onclick = strart;
}