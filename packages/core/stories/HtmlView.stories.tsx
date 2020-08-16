import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { HtmlView } from '../src';

const articleContent = `
<h5>Lion</h5>
<img src="https://source.unsplash.com/IPRFX7CVVoU/288x288" alt="Lion" />

<p>
    The lion is a species in the family 
    <a href="https://en.wikipedia.org/wiki/Felidae">Felidae</a>.
    It is a muscular, deep-chested cat with a short, rounded head,
    a reduced neck and round ears, and a hairy tuft at the end of
    its tail.
</p>

<p>
    One of the most widely recognised animal symbols in human culture,
    the lion has been extensively depicted in sculptures and paintings,
    on national flags, and in contemporary films and literature.
</p>

<table style="font-size: 12px; width: 100%; margin-bottom: 8px">
    <thead>
        <tr>
            <th>Average</th>
            <th>Female</th>
            <th>Male</th>
        </tr>  
    </thead>
    <tbody>
        <tr>
            <td>Body length</td>        
            <td>160–184 cm</td>        
            <td>184–208 cm</td>        
        </tr>
        <tr>
            <td>Tail length</td>        
            <td>72–89.5 cm</td>        
            <td>82.5–93.5 cm</td>        
        </tr>
        <tr>
            <td>Weight</td>        
            <td>90.5–138 kg</td>        
            <td>155–169 kg</td>        
        </tr>
    </tbody>
</table>

<h6>References</h6>
<ul>
    <li>Wikipedia - <a href="https://en.wikipedia.org/wiki/Lion">Lion</a></li>
    <li>Cat Specialist Group - <a href="http://www.catsg.org/index.php?id=108">African Lion</a></li>
    <li><a href="http://www.lionconservationfund.org/">Lion Conservation Fund</a></li>
</ul>
`;

const cardContent = `
<img src="https://source.unsplash.com/9c_djeQTDyY/288x288" alt="Reading Material" />
<h6>Pre-Workshop Reading</h6>
<h6 class="rf-subtitle">React Basics</h6>
<p>
   Be sure to read the prerequisite material before the workshop.
</p>
`;

const htmlElementsContent = `
<h1>Headline 1</h1>
<h2>Headline 2</h2>
<h3>Headline 3</h3>
<h4>Headline 4</h4>
<h5>Headline 5</h5>
<h6>Headline 6</h6>
<h6 class="rf-subtitle1">Subtitle 1</h6>
<h6 class="rf-subtitle2">Subtitle 2</h6>

<p class="rf-body1">
    Body 1. The lion is a species in the family Felidae. It is a muscular,
    deep-chested cat with a short, rounded head, a reduced neck and
    round ears, and a hairy tuft at the end of its tail.
</p>


<p class="rf-body2">
    Body 2. The lion is a species in the family Felidae. It is a muscular,
    deep-chested cat with a short, rounded head, a reduced neck and
    round ears, and a hairy tuft at the end of its tail.
</p>

<p><strong>Bold</strong></p>
<p><em>Italic</em></p>
<p><u>Underline</u></p>
<p><s>Strikethrough</s></p>
<p><code>Code</code></p>
<p>
  <em><strong>Bold and italic</strong></em>
</p>

<p>
  <a
    href="https://en.wikipedia.org/wiki/Lion"
    target="_blank"
    rel="noopener noreferrer"
    >Lion</a
  >
</p>

<img src="https://source.unsplash.com/IPRFX7CVVoU/288x288" alt="Lion" />

<ul>
    <li>The lion is a species in the family Felidae. It is a muscular,
    deep-chested cat with a short, rounded head, a reduced neck and
    round ears, and a hairy tuft at the end of its tail.</li>
    <li>One of the most widely recognised animal symbols in human culture,
    the lion has been extensively depicted in sculptures and paintings,
    on national flags, and in contemporary films and literature.</li>
</ul>

<ol>
    <li>The lion is a species in the family Felidae. It is a muscular,
    deep-chested cat with a short, rounded head, a reduced neck and
    round ears, and a hairy tuft at the end of its tail.</li>
    <li>One of the most widely recognised animal symbols in human culture,
    the lion has been extensively depicted in sculptures and paintings,
    on national flags, and in contemporary films and literature.</li>
</ol>

<blockquote>
    Ask not what your country can do for you,
    but what you can do for your country.
    - John F. Kennedy
</blockquote>

<pre>
const total = price * quantity;
const tax = total * taxRate
</pre>
`;

const metadata = {
    component: HtmlView,
    title: 'core/HtmlView',
};
export default metadata;

export const ArticleStory = () => {
    return <HtmlView maxWidth={320} html={articleContent} />;
};
ArticleStory.storyName = 'Article';

export const CardStory = () => {
    return <HtmlView maxWidth={320} html={cardContent} />;
};
CardStory.storyName = 'Card';

export const HtmlElementsStory = () => {
    return <HtmlView maxWidth={480} html={htmlElementsContent} />;
};
HtmlElementsStory.storyName = 'HTML Elements';

export const MuiTypographyStory = () => {
    return (
        <Box maxWidth={480}>
            <Typography variant="h1">Headline 1</Typography>
            <Typography variant="h2">Headline 2</Typography>
            <Typography variant="h3">Headline 3</Typography>
            <Typography variant="h4">Headline 4</Typography>
            <Typography variant="h5">Headline 5</Typography>
            <Typography variant="h6">Headline 6</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="subtitle2">Subtitle 2</Typography>
            <Typography variant="body1">
                Body 1. The lion is a species in the family Felidae. It is a
                muscular, deep-chested cat with a short, rounded head, a reduced
                neck and round ears, and a hairy tuft at the end of its tail.
            </Typography>
            <Typography variant="body2">
                Body 2. The lion is a species in the family Felidae. It is a
                muscular, deep-chested cat with a short, rounded head, a reduced
                neck and round ears, and a hairy tuft at the end of its tail.
            </Typography>
        </Box>
    );
};
MuiTypographyStory.storyName = 'MUI Typography';
